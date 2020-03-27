const puppeteer = require('puppeteer');
const upyun = require('upyun');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // slow down by 250ms
  });
  const page = await browser.newPage();
  await page.setContent('<!DOCTYPE html><head></head><body></body></html>');
  await page.addScriptTag({ path: './node_modules/axios/dist/axios.js' });
  await page.addScriptTag({ path: './node_modules/upyun/dist/upyun.js' });
  await page.exposeFunction('getSignHeader', (bucket, method, path) => {
    console.log(upyun.sign.getHeaderSign(bucket, method, path));
    return Promise.resolve(upyun.sign.getHeaderSign(bucket, method, path));
  });
  await page.evaluate(async function () {
    const client = await Promise.resolve(new window.upyun.Client(new window.upyun.Bucket('helloworldtest12'), window.getSignHeader));
    console.log(client);
    const size = await client.listDir('/test11/');
    console.log(size);
  });
  // await browser.close();
})();
