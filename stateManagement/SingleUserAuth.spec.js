import { test, expect } from '@playwright/test'

test.use({storageState:'auth-admin.json'})
test('User should reirect on projectlist page withlot login', async({page}) =>{
    await page.goto('https://app.bldz.ai/login');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000)
    await expect(page.locator('#tour_project')).toContainText('Projects');
})