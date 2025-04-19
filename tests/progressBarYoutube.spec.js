import {expect, test} from '@playwright/test'

test('Youtube video bar verification', async({page}) =>
{
    await page.goto('https://www.youtube.com/');
    await page.getByPlaceholder('Search').click();
    await page.keyboard.type('ramayan',{delay:1000});
    await page.keyboard.press('ArrowDown', {delay:1000});
    await page.getByRole('listbox').click();
    await page.getByRole("img").nth(3).click();
    await page.getByRole('slider', {name:'slider'}).hover();
    //const progressBar = await page.getByRole('slider', {name:'slider'});
    //await expect(progressBar).toHaveAttribute('style','left: 100%; width: 0%;')
    //await page.locator('.ytp-timed-markers-container').hover();
    
   

    
    await page.pause();
})

//
// https://playwright.dev/docs/api/class-genericassertions#generic-assertions-close-to


// expect({ prop: 0.1 + 0.2 }).not.toEqual({ prop: 0.3 });

// check this assertion pass or fail.
//