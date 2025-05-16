import { test, expect, request } from '@playwright/test'
//https://reqres.in/
test('Get request for all users list', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/users?page=2', {
        headers: {
            'x-api-key': "reqres-free-v1"
        }
    });

    const statusCode = response.status();
    console.log('Status Code: ' + statusCode);

    const bodydata = await response.json();
    console.log("Response Data: ", bodydata);
    expect(statusCode).toBe(200);
})

test('Get request for single user', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': "reqres-free-v1"
        }
    });

    const statusCode = response.status();
    console.log("Status Code: " + statusCode);

    const body = await response.json();
    // console.log('Response Data', body);

    expect(statusCode).toBe(200);
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.data.first_name).toBe('Janet');
    expect(body.data.last_name).toBe('Weaver');
    expect(body.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
    expect(body.support.url).toBe('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
    expect(body.support.text).toBe('Tired of writing endless social media content? Let Content Caddy generate it for you.');

})
//https://reqres.in/api/users/23
test('Get request for single user not found', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/users/23', {
        headers:
        {
            'x-api-key': "reqres-free-v1"
        }
    });

    const statusCode = response.status();
    console.log('StatusCode:', statusCode);

    const body = await response.json();
    expect(statusCode).toBe(404);
    expect(body).toEqual({});
})

test('Get request for retrieve all list resources', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/unknown', {
        headers: {
            'x-api-key': "reqres-free-v1"
        }
    });

    const statusCode = response.status();
    console.log('Response Code: ', statusCode);

    const body = await response.json();
    expect(statusCode).toBe(200);
    console.log("Response Data: ", body)

    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('per_page');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('total_pages');
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('support');

    for (const item of body.data) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('year');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('pantone_value');
    }

    expect(body.support).toHaveProperty('url');
    expect(body.support).toHaveProperty('text');
})

test('Get Single Resource', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/unknown/2',
        {
            headers: {
                'x-api-key': "reqres-free-v1"
            }
        }
    );

    const statusCode = response.status();
    console.log('Response Code: ', statusCode);

    const body = await response.json();
    expect(statusCode).toBe(200);
    console.log("Response Data: ", body)

    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('support');
    //data value assertions
    expect(body.data.id).toBe(2);
    expect(body.data.name).toBe('fuchsia rose');
    expect(body.data.year).toBe(2001);
    expect(body.data.color).toBe('#C74375');
    expect(body.data.pantone_value).toBe('17-2031');

    //Support value assertions
    expect(body.support.url).toBe('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
    expect(body.support.text).toBe('Tired of writing endless social media content? Let Content Caddy generate it for you.');


})

test.only('Get method for Signle resource not found', async() =>
{
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/unknown/23',
        {
            headers: {
                'x-api-key': "reqres-free-v1"
            }
        }
    );

    const statusCode = response.status();
    console.log('Response Code: ', statusCode);

    const body = await response.json();
    expect(statusCode).toBe(404);
    console.log("Response Data: ", body)
    expect(body).toEqual({});
})


