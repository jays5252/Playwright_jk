import { test, expect } from '@playwright/test'

test('Mouse normal click event', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Other Events' }).click();
    await page.locator('#singleClickBtn').click();
    await expect(page.locator('#eventDisplay')).toHaveText('Button is single clicked')
    
})

test('Mouse right click event', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Right Click Event' }).click();
    await page.getByAltText('Home').click({button:'right'});
    await expect(page.getByText('Background color changed to')).toHaveText('Background color changed to green. Left-click again to revert.')
    //await page.pause();
})

test('Mouse Double click event', async({page}) =>
{
    await page.goto('https://jkautomation.azurewebsites.net/index.html')
    await page.getByRole("link", { name: 'Other Events' }).click();
    await page.locator('#doubleClickBtn').dblclick();
    await expect(page.locator('#eventDisplay')).toHaveText('Button is double clicked')
})

test('Mouse Hover Event', async({page}) =>
{
    await page.goto('https://jkautomation.azurewebsites.net/index.html')
    await page.getByRole("link", { name: 'Other Events' }).click();
    await page.locator('#mouseOverBtn').hover();
    await expect(page.locator('#eventDisplay')).toHaveText('Mouse over button');
})