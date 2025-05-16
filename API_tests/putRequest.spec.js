import { test, expect, request } from '@playwright/test'

test('Update record using Put method', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.put('https://reqres.in//api/users/2', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    });

    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("job");
    expect(body).toHaveProperty("updatedAt");

    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('zion resident');

})