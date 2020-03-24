const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent('<!DOCTYPE html><head></head><body></body></html>');
  await page.addScriptTag({ path: './node_modules/upyun/dist/upyun.js' });
  await page.addScriptTag({ path: './node_modules/axios/dist/axios.js' });
  await page.waitForNavigation(async () => {
    await console.log(window.axios);
  });

  await browser.close();
  })();