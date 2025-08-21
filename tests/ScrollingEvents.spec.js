import {test, expect} from '@playwright/test'

test('Scrolls automatically so that button is visible', async({page}) =>{
    await page.goto('https://playwright.dev/docs/input')
    await page.locator('#scrolling').dblclick();
    await page.waitForTimeout(3000);
})

// test.only('Scroll the footer into view, forcing an "infinite list" to load more content', async({page}) =>
// {
//     await page.goto('https://www.youtube.com/')
//     await page.locator('#endpoint').scrollIntoViewIfNeeded();
//     await expect(page.locator('#endpoint')).toBeVisible();
// })

test('Position the mouse and scroll with the mouse wheel', async({page}) =>
{
    await page.goto('https://playwright.dev/docs/input');
    await page.getByRole('scrollbar', {name:'Docs sidebar'}).hover();
    await page.mouse.wheel(0,10);

})