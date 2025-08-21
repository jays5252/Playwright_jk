// global-setup.ts
import { chromium, expect } from "@playwright/test";
import fs from 'fs';

const users = [
  { username: 'sarah@yopmail.com', password: 'User@123', role: 'admin' },
  { username: 'general_contractor@zepth.com', password: '@g@lton@123a', role: 'contractor' },
  //{ username: 'consultant@zepth.com', password: '@g@lton@123a', role: 'consultant' },
];

async function globalSetup() {
  for (const user of users) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://app.bldz.ai/login');
    await page.locator('#email').fill(user.username);
    await page.locator('#password').fill(user.password);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Wait for dashboard or known landing element
    await page.waitForSelector('#tour_project');
    await expect(page.locator('#tour_project')).toContainText('Projects');

    await page.context().storageState({ path: `auth-${user.role}.json` });
    console.log(`[✔] Auth file created: auth-${user.role}.json`);

    await browser.close();
  }
}

export default globalSetup;