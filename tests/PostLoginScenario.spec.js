import { test, expect } from '@playwright/test'

test('TC_01: User should see the account dashboard', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();

    const welcomeMessage = await (page.locator('.not-logged-in').nth(0));
    await expect(welcomeMessage).toHaveText('Default welcome msg!');

    //sidemenu contents
    const myOrder = await page.getByRole('link', { name: 'My Orders' });
    await expect(myOrder).toBeVisible();

    const myAccountInfo = await page.getByRole('link', { name: 'Account Information' });
    await expect(myAccountInfo).toBeVisible();

    const myWishlists = await page.getByRole('link', { name: 'My Wish List' });
    await expect(myWishlists).toBeVisible();
    //await page.pause();
})

test('TC_02: User can access and view past orders', async ({ page }) => {
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();

    //my order click

    const myOrder = await page.getByRole('link', { name: 'My Orders' });
    await myOrder.click();

    const AllOrders = 'table.table-order-items.history';

  await page.waitForSelector(`${AllOrders} tbody`);

  const rows = await page.$$(`${AllOrders} tbody tr`);
  if (rows.length === 0) {
    throw new Error('No rows found in the order table.');
  }

  for (var i = 0; i < rows.length; i++) {
    const Order = await rows[i].$$eval('td', function(tds) {
      return tds.map(function(td) {
        return td.textContent.trim();
      });
    });

    if (Order.length !== 5) {
      throw new Error('Row ' + (i + 1) + ' does not have 5 columns.');
    }

    if (!Order[0]) throw new Error('Row ' + (i + 1) + ': Order # is empty');
    if (!Order[1]) throw new Error('Row ' + (i + 1) + ': Date is empty');
    if (!Order[2]) throw new Error('Row ' + (i + 1) + ': Order Total is empty');
    if (!Order[3]) throw new Error('Row ' + (i + 1) + ': Status is empty');
    if (Order[4].indexOf('View Order') === -1) {
      throw new Error('Row ' + (i + 1) + ': Action does not contain "View Order"');
    }

    console.log(' Order ' + (i + 1) + ' validated:', Order);
  }

  console.log(' order rows validated successfully.');
})

test.only('TC_03: User can update name, email, or password', async({page}) =>
{
    await page.goto('https://magento-demo.mageplaza.com/default/customer/account/login/');
    await page.locator('#email').fill('roni_cost@example.com');
    await page.locator('#pass').fill('roni_cost3@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.getByRole('link', {name:'Account Information'}).click();
    await page.locator('#firstname').clear();
    await page.locator('#firstname').fill('Jay');

    await page.locator('#lastname').clear();
    await page.locator('#lastname').fill('Singh')

    await page.getByRole('checkbox', {name:'Change Email'}).check();
    await page.locator('#email').clear();
    await page.locator('#email').fill('abc@gmail.com');

    await page.locator('#current-password').fill('roni_cost3@example.com')

    await page.getByRole('button', {name:'Save'}).click();


    await page.pause();
})  