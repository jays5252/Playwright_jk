import {test, expect} from "@playwright/test"

test('Press Even using keyword Method', async({page})=>
{
    await page.goto('https://www.toptal.com/developers/keycode');
    await page.keyboard.press('Space');
    await expect(page.getByTestId('top-area-key-code')).toHaveText('32');
    //await page.pause();
})

test('Keyword Down and Keyword up event', async({page}) =>
{
    await page.goto('https://www.toptal.com/developers/keycode');
    await page.keyboard.down('ShiftLeft').press('KeyA').keyboard().up;
    await page.keyboard.up('ShiftLeft');
    await page.pause();
})

test('Insert Text Event', async({page}) =>
{
    await page.goto('https://www.google.com/');
    await page.keyboard.insertText('Youtube');
    //await page.pause();
    //await page.locator('#APjFqb').keyboard.
})

test.only('Type event in a textBox', async({page}) =>
{
    await page.goto('https://www.google.com/');
    await page.keyboard.type('Latest trending Song');
    await page.keyboard.type('trending Song',{delay:100});   
})
