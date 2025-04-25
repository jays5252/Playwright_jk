import { test, expect } from '@playwright/test'

test('TC_01: Verify user can log in with valid credentials', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('.not-logged-in').nth(0)).toHaveText('Default welcome msg!');
    await page.getByRole('listitem').filter({ hasText: 'Change My Account My Wish' }).locator('button').click();
    await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();

})

test('TC_02: Check error message with incorrect password', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.c');
    await page.getByRole('button', { name: 'Sign In' }).click();
    const errorMessge = await page.getByRole('alert');
    await expect(errorMessge).toContainText('The account sign-in was incorrect or your account is disabled temporarily.');
})

test('TC_03: Empty Fields Validation', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Sign In' }).click();
    const emailErrorMessage = await page.locator('#email-error');
    const passwordErrorMessage = await page.locator('#pass-error')
    await expect(emailErrorMessage).toHaveText('This is a required field.');
    await expect(passwordErrorMessage).toHaveText('This is a required field.')
})

test('TC_04: Invalid Email Format', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Sign In' }).click();
    const incorrectEMailError = await page.locator('#email-error');
    await expect(incorrectEMailError).toHaveText('Please enter a valid email address (Ex: johndoe@domain.com).');
})
test('TC_05: Forgot Password Link', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.getByRole('link', { name: 'Forgot Your Password?' }).click();

    const pageTitle = await page.locator('.base');
    await expect(pageTitle).toContainText('Forgot Your Password?');

    const emailField = await page.locator('#email_address');
    await expect(emailField).toBeVisible();

    const resetPassButton = await page.getByRole('button', { name: 'Reset My Password' })
    await expect(resetPassButton).toBeVisible();

})

test('TC_06: Ensure login session persists across navigation', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'store logo' }).click();
    await page.waitForLoadState();
    await page.goBack();
    await page.waitForLoadState();
    await expect(page.locator('.not-logged-in').nth(0)).toHaveText('Default welcome msg!');
    await page.getByRole('listitem').filter({ hasText: 'Change My Account My Wish' }).locator('button').click();
    await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
})

test('TC_07: Logout Functionality', async({page}) =>
{
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('listitem').filter({ hasText: 'Change My Account My Wish' }).locator('button').click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Sign Out' }).click();
    await expect(page.getByText('You are signed out')).toBeVisible();
})
