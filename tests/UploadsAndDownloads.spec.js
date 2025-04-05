import test, { expect, page } from '@playwright/test'
import { promises } from 'dns';

test('Single File uplaod verification', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: "Upload and Download" }).click();
    await page.locator("#fileInput").setInputFiles("../Playwright_jk/DemoFiles/ascii-art.txt");
    await expect(page.locator('#fileInput')).toHaveText('ascii-art.txt');
    await page.getByRole("button", { name: "Upload" }).click();
})

test('Single File uplaod verification using locator inside setinputFile', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: "Upload and Download" }).click();
    await page.setInputFiles('#fileInput', '../Playwright_jk/DemoFiles/ascii-art.txt');
    await page.getByRole("button", { name: "Upload" }).click();
})

test('Multiple file upload', async({page}) =>
{
    //Locator accepts only sinle file upload
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: "Upload and Download" }).click();
    await page.setInputFiles('#fileInput', ['../Playwright_jk/DemoFiles/ascii-art.txt','../Playwright_jk/DemoFiles/long-doc (1).txt']);
    await page.pause();
    await page.getByRole("button", { name: "Upload" }).click();
})
 test.only('FileDownload from a locator', async({page}) =>
{
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: "Upload and Download" }).click();
    await page.setInputFiles('#fileInput', '../Playwright_jk/DemoFiles/ascii-art.txt');
    await page.getByRole("button", { name: "Upload" }).click();
    await expect(page.getByRole("button", {name:"Download"})).toBeVisible();
    await page.pause();

    const [ fileDownload ] = await Promise.all([
        page.waitForEvent('download'),
        page.click(getByRole("button", {name:"Download"}))
    ]);

    const path = fileDownload.path();
    console.log('Downloaded file saved at:', path);
})



