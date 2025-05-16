import { test, expect, request } from "@playwright/test"

test('Create with post request', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {
            "name": "Sarah Williums",
            "job": "Skilled worker"
        }
    });

    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    //Assertions pard
    expect(statusCode).toBe(201);

    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('job');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');

    expect(body.name).toBe('Sarah Williums');
    expect(body.job).toBe('Skilled worker');
})
//Question: In postmant received response code 200, however in code it's 201.
test('Register Successfull', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {

            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });

    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    //Assertions pard
    expect(statusCode).toBe(200);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
})

test('Register Unsuccessfull', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://reqres.in/api/register', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {
            "email": "sydney@fife"
        }
    });
    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    //Assertions pard
    expect(statusCode).toBe(400);
    expect(body.error).toBe('Missing password');

})

test('Login Successfull', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://reqres.in/api/login', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body.token).toBe('QpwL5tke4Pnpja7X4')
   })

   test.only('Login Unsuccessfull', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://reqres.in/api/login', {
        headers: {
            'x-api-key': "reqres-free-v1"
        },
        data: {
            "email": "peter@klaven"
        }
    });
    const statusCode = response.status();
    console.log(statusCode);

    const body = await response.json();
    console.log('Body Data:', body);
    expect(statusCode).toBe(400);
    expect(body.error).toBe('Missing password')
    //expect(body.error).toBe('Missing password');
})