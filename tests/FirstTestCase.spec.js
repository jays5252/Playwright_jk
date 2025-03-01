const{test, expect} = require("@playwright/test");

test("Verify Google Page title",async({browser})=>
{
    //Create ew browser context
    const context = browser.newContext();

    //Open a new tab
    const page = context.newPage();
    expect(page)


})
