import { expect, test } from "@playwright/test"

test("Verify Login with valid Credential", {tag:'@smoke', annotation:{type:'test', description:'genral test case'}}, async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page).toHaveTitle('Swag Labs');
})

test('Verify login  with invalid credential @smoke, @regression', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.locator('data-test=error')).toBeVisible();
    await expect(page.locator('data-test=error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
})