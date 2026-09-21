import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const URL = 'http://127.0.0.1:4319/avatar-puppet-lab.html';
const OUTPUT = path.join(ROOT, 'outputs', 'avatar-puppet');
fs.mkdirSync(OUTPUT, { recursive: true });

const server = spawn('python', ['-m', 'http.server', '4319', '--bind', '127.0.0.1', '--directory', 'public'], {
  cwd: ROOT,
  stdio: 'ignore',
});

async function waitForServer() {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(URL, { method: 'HEAD' });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Static preview server did not start: ${URL}`);
}

function findPlaywright() {
  const local = path.join(ROOT, 'node_modules', 'playwright', 'index.mjs');
  if (fs.existsSync(local)) return local;
  const cacheRoot = path.join(process.env.LOCALAPPDATA ?? '', 'npm-cache', '_npx');
  if (fs.existsSync(cacheRoot)) {
    for (const dir of fs.readdirSync(cacheRoot)) {
      const candidate = path.join(cacheRoot, dir, 'node_modules', 'playwright', 'index.mjs');
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  throw new Error('Playwright not found. Run: npx --yes playwright@1.55.0 --version');
}

const { chromium } = await import(pathToFileURL(findPlaywright()).href);
await waitForServer();
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', (error) => pageErrors.push(String(error)));

async function getState() {
  return page.evaluate(() => window.__KONNI_PUPPET_DEBUG__.getState());
}

async function move(rx, ry, wait = 700) {
  const box = await page.locator('#avatarWrap').boundingBox();
  assert.ok(box, 'avatarWrap must exist');
  await page.mouse.move(box.x + box.width / 2 + rx, box.y + box.height / 2 + ry, { steps: 24 });
  await page.waitForTimeout(wait);
  return getState();
}

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Boolean(window.__KONNI_PUPPET_DEBUG__));
  await page.locator('#stage').waitFor({ state: 'visible' });

  const imageInfo = await page.evaluate(async () => {
    const images = [...document.querySelectorAll('#stage img')];
    await Promise.all(images.map((img) => img.decode()));
    return images.map((img) => ({
      id: img.id,
      src: img.getAttribute('src'),
      width: img.naturalWidth,
      height: img.naturalHeight,
      complete: img.complete,
    }));
  });
  assert.equal(imageInfo.length, 4);
  for (const image of imageInfo) {
    assert.equal(image.complete, true, `${image.id} must load`);
    assert.equal(image.width, 256, `${image.id} natural width`);
    assert.equal(image.height, 256, `${image.id} natural height`);
  }

  const fixedBefore = await page.evaluate(() => ({
    back: {
      src: document.querySelector('#faceBack').getAttribute('src'),
      transform: getComputedStyle(document.querySelector('#faceBack')).transform,
      rect: document.querySelector('#faceBack').getBoundingClientRect().toJSON(),
    },
    front: {
      src: document.querySelector('#faceFront').getAttribute('src'),
      transform: getComputedStyle(document.querySelector('#faceFront')).transform,
      rect: document.querySelector('#faceFront').getBoundingClientRect().toJSON(),
    },
  }));

  const samples = [
    ['center', 0, 0],
    ['north', 0, -390],
    ['north-east', 390, -310],
    ['east', 440, 0],
    ['south-east', 390, 310],
    ['south', 0, 390],
    ['south-west', -390, 310],
    ['west', -440, 0],
    ['north-west', -390, -310],
  ];

  const results = {};
  for (const [name, rx, ry] of samples) {
    const state = await move(rx, ry);
    assert.ok(Math.abs(state.renderX) <= 10, `${name}: x exceeds range`);
    assert.ok(Math.abs(state.renderY) <= 6, `${name}: y exceeds range`);
    if (name === 'center') {
      assert.equal(Math.abs(state.renderX), 0);
      assert.equal(Math.abs(state.renderY), 0);
    }
    if (name === 'north') assert.ok(state.renderY < 0);
    if (name === 'north-east') assert.ok(state.renderX > 0 && state.renderY < 0);
    if (name === 'east') assert.ok(state.renderX > 0);
    if (name === 'south-east') assert.ok(state.renderX > 0 && state.renderY > 0);
    if (name === 'south') assert.ok(state.renderY > 0);
    if (name === 'south-west') assert.ok(state.renderX < 0 && state.renderY > 0);
    if (name === 'west') assert.ok(state.renderX < 0);
    if (name === 'north-west') assert.ok(state.renderX < 0 && state.renderY < 0);
    results[name] = { x: state.renderX, y: state.renderY };
    await page.locator('#avatarWrap').screenshot({ path: path.join(OUTPUT, `white-sailor-${name}.png`) });
  }

  const layers = await page.evaluate(() => window.__KONNI_PUPPET_DEBUG__.layers());
  assert.equal(layers.back.z, '1');
  assert.equal(layers.front.z, '3');
  assert.equal(layers.irises.length, 2);
  assert.ok(layers.irises.every((iris) => iris.z === '2'));
  assert.equal(layers.back.src, '/avatar-white-sailor/layered/face-back.png');
  assert.equal(layers.front.src, '/avatar-white-sailor/layered/face-front.png');

  const box = await page.locator('#avatarWrap').boundingBox();
  assert.ok(box);
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const circleStates = [];
  for (let i = 0; i < 48; i++) {
    const angle = (i / 48) * Math.PI * 2;
    await page.mouse.move(cx + Math.cos(angle) * 430, cy + Math.sin(angle) * 330, { steps: 4 });
    await page.waitForTimeout(85);
    const state = await getState();
    assert.ok(Math.abs(state.renderX) <= 10 && Math.abs(state.renderY) <= 6);
    circleStates.push(`${state.renderX},${state.renderY}`);
  }
  const distinctCircleStates = new Set(circleStates).size;
  assert.ok(distinctCircleStates >= 20, `expected >=20 circle states, got ${distinctCircleStates}`);

  const fixedAfter = await page.evaluate(() => ({
    back: {
      src: document.querySelector('#faceBack').getAttribute('src'),
      transform: getComputedStyle(document.querySelector('#faceBack')).transform,
      rect: document.querySelector('#faceBack').getBoundingClientRect().toJSON(),
    },
    front: {
      src: document.querySelector('#faceFront').getAttribute('src'),
      transform: getComputedStyle(document.querySelector('#faceFront')).transform,
      rect: document.querySelector('#faceFront').getBoundingClientRect().toJSON(),
    },
  }));
  assert.deepEqual(fixedAfter, fixedBefore, 'face back/front must stay completely fixed');

  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join('\n')}`);
  assert.deepEqual(pageErrors, [], `page errors: ${pageErrors.join('\n')}`);

  await page.screenshot({ path: path.join(OUTPUT, 'white-sailor-layered-lab.png'), fullPage: true });
  console.log(JSON.stringify({
    ok: true,
    mode: 'white-sailor-layered-puppet',
    imageInfo,
    results,
    distinctCircleStates,
    fixedFaceStable: true,
    layerOrder: { back: 1, iris: 2, front: 3 },
    consoleErrors,
    pageErrors,
  }, null, 2));
} finally {
  await browser.close();
  server.kill();
}
