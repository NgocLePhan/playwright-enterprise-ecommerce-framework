import {test, expect} from '@playwright/test';

test.describe('USER API TESTING (ReqRes)', () => {

    test('API-TC01: GET user by ID - should return 200 and valid user details @api', async({request}) => {    
        let response: any;
        let responseBody: any;

        await test.step('Step 01: Send GET request to /api/users/2', async() => {
            response = await request.get('https://reqres.in/api/users/2');
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });
        
        await test.step('Step 02: Validate response body schema and data', async() => {
            responseBody = await response.json();

            expect(responseBody.data.id).toBe(2);
            expect(responseBody.data.email).toContain('@reqres.in');
            expect(responseBody.data.first_name).toBeDefined();
            expect(responseBody.data.last_name).toBeDefined();
        }); 
    });

    test('API-TC02: POST create user - should return 201 with generated id @api', async({request}) => {
        const payload = {
            name: 'Ngoc Le', 
            job: 'QA Lead'
        };

        const response = await request.post('https://reqres.in/api/users', {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.name).toBe(payload.name);
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.createdAt).toBeTruthy();
    })
})