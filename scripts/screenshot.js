const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.join(__dirname, '..', 'images', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({args: ['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, '..', 'index.html');
  const url = 'file://' + filePath;

  const viewports = [
    { name: 'mobile', width: 390, height: 844 }, // iPhone 12 size
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'desktop', width: 1366, height: 768 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    // small delay to let animations settle
    await page.waitForTimeout(600);

    const screenshotPath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Saved', screenshotPath);
  }

  await browser.close();
})();
