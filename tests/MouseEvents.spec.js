import { test, expect } from '@playwright/test'

test('Mouse normal click event', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Right Click Event' }).click();
})

test('Mouse right click event', async ({ page }) => {
    await page.goto('https://jkautomation.azurewebsites.net/index.html');
    await page.getByRole("link", { name: 'Right Click Event' }).click();
    await page.mouse
})