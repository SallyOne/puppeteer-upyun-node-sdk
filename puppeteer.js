const puppeteer = require('puppeteer');
const upyunHandle = require('./upyun');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // slow down by 250ms
  });
  const page = await browser.newPage();
  await page.setContent('<!DOCTYPE html><head></head><body></body></html>');
  await page.addScriptTag({ path: './node_modules/axios/dist/axios.js' });
  await page.addScriptTag({ path: './node_modules/upyun/dist/upyun.js' });
  // await page.evaluateOnNewDocument(fs.readFileSync('./node_modules/axios/dist/axios.js', 'utf8'));
  // await page.evaluateOnNewDocument(fs.readFileSync('./node_modules/upyun/dist/upyun.js', 'utf8'));
  await page.exposeFunction('createClient', async (clientString, service) => {
    return await upyunHandle.createClient(new Function('return ' + clientString)(), service);
  });
  await page.evaluate(async function () {
    console.log(1);
    const client = await window.createClient(window.upyun.Client.toString(), 'helloworldtest12');
    console.log(client);
  });
  // await browser.close();
})();
