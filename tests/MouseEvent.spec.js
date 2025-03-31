import { test, expect } from '@playwright/test'

test('Generic Click or mouse left click', async ({ page }) => {
    await page.goto('https://uat.bldz.ai/');
    await page.locator('[type="submit"]').click();
    //await page.pause();
})

test('Double click via mouse on a Locator', async ({ page }) => {
    await page.goto('https://uat.bldz.ai/');
    await page.locator('//h1[@class="text-2xl font-semibold"]').dblclick();
    //await page.pause();
})

test('Right click on an element', async ({ page }) => {
    await page.goto('https://uat.bldz.ai/');
    await page.locator('//h1[@class="text-2xl font-semibold"]').click({ button: 'right' });
})
test('Clicking on a button Shift+click', async ({ page }) => {
    await page.goto('https://uat.bldz.ai/');
    await page.locator('//h1[@class="text-2xl font-semibold"]').click({ modifiers: ['Shift'] });
})


