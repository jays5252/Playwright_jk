import {test, expect} from '@playwright/test'

test('Click on All dropdown Elements', async({page})=>
{
    await page.goto('https://playwright.dev/');
    await page.locator('//a[@role="button"]').hover();
    let supportedLanguage =  await page.locator('//a[@target="_self"]').all();
    for(const dropdownValue of supportedLanguage)
    {
        await dropdownValue.click();
        await page.locator('//a[@role="button"]').hover();
        //await page.waitForTimeout(3000);
    }

})

//https://jkautomation.azurewebsites.net/