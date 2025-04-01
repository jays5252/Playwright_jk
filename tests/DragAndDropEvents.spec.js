import {test, expect} from '@playwright/test'

test ('Drag and drop using method dragTo()', async({page}) =>
{
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Drag and Drop Example' }).click();
    await page.locator('#dragElement').dragTo(page.locator('#dropTarget'));
    await expect(page.locator('#dropTarget')).toHaveText('Dragged element');
    //await page.pause();
})

test('Drag and Drop using mouse mannually', async({page}) =>
{
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Drag and Drop Example' }).click();
    await page.locator('#dragElement').hover();
    await page.mouse.down();
    await page.locator('#dropTarget').hover();
    await page.mouse.up();
    await expect(page.locator('#dropTarget')).toHaveText('Dragged element');
})