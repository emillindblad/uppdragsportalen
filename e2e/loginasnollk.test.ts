import { test, expect } from '@playwright/test';

// test('login as nollk', async ({ page }) => {
//     await page.goto('http://localhost:3000/login');
//     await page.locator('input[name="email"]').click();
//     await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
//     await page.locator('input[name="password"]').click();
//     await page.locator('input[name="password"]').fill('1234');
//     await page.getByRole('button', { name: 'Logga in' }).click();
    
//     await expect(page).toHaveURL('/home');
//     await expect(page.getByRole('button', { name: 'Mina nolluppdrag' })).toHaveText('Mina nolluppdrag');
//     await expect(page.getByRole('button', { name: 'Arkiv' })).toHaveText('Arkiv');
    
//     await page.getByRole('button', { name: 'Arkiv'}).click();
//     await expect(page).toHaveURL('/archive');
// });


// test('filter table by asc, desc, default order', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//     await page.locator('input[name="email"]').click();
//     await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
//     await page.locator('input[name="password"]').click();
//     await page.locator('input[name="password"]').fill('1234');
//     await page.getByRole('button', { name: 'Logga in' }).click();

//     await page.getByText('Namn på uppdrag').click();
//     await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag ↓');

//     await page.getByText('Namn på uppdrag ↓').click();
//     await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag ↑');

//     await page.getByText('Namn på uppdrag ↑').click();
//     await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag');

// });

// test('search after an uppdrag', async ({ page }) => {
//     // login as nollk
//     await page.goto('http://localhost:3000/login');
//     await page.locator('input[name="email"]').click();
//     await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
//     await page.locator('input[name="password"]').click();
//     await page.locator('input[name="password"]').fill('1234');
//     await page.getByRole('button', { name: 'Logga in' }).click();

//     // search for 'oo'
//     await page.locator('input[name="search"]').fill('oo');
//     await expect(page.locator('input[name="search"]')).toHaveValue('oo');
    
//     // show only uppdrag containing 'oo'
//     await expect(page.getByText('foobar123falseAPPROVED')).toBeVisible();
//     await expect(page.getByText('WooplkjasfdasdfalseAPPROVED')).toBeVisible();
//     await expect(page.getByText('Ännu ett uppdrag')).toBeHidden();

//     // click on one uppdrag and see its info
//     await page.getByText('foo').click();
//     await expect(page).toHaveURL('/uppdrag/viewuppdrag');

//     await expect(page.getByText('Antal deltagare: 1')).toBeVisible();
//     await expect(page.getByText('Plats: bar')).toBeVisible();
//     await expect(page.getByText('Tid: 123')).toBeVisible();
//     await expect(page.getByText('Motivation: 2')).toBeVisible();
//     await expect(page.getByText('Privat: false')).toBeVisible();

//     await expect(page.getByText('Emil Lindblad, 2023')).toBeVisible();
//     await expect(page.getByText('uppdrag.nollkit@chalmers.it').nth(1)).toBeVisible();

//     await page.getByRole('button', { name: 'Tillbaka' }).click();
//     await expect(page).toHaveURL('/home');
// });


// test('edit your own uppdrag', async ({ page }) => {
//     // login as nollk
//     await page.goto('http://localhost:3000/login');
//     await page.locator('input[name="email"]').click();
//     await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
//     await page.locator('input[name="password"]').click();
//     await page.locator('input[name="password"]').fill('1234');
//     await page.getByRole('button', { name: 'Logga in' }).click();

//     // navigate to a uppdrag
//     await page.getByText('Ännu ett uppdrag').click();
//     await expect(page).toHaveURL('/uppdrag/viewuppdrag');

//     // can edit your own uppdrag
//     await page.getByRole('button', { name: 'Redigera'}).click();
//     await expect(page).toHaveURL('/uppdrag/edituppdrag/clf15spkz000cxevoe1n23743');
// });


test('cant edit another nollk:s uppdrag', async ({ page }) => {
    // login as nollk
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();

    // navigate to all nolluppdrag
    await page.getByRole('button', { name: 'Chalmers nolluppdrag'}).click();
    await expect(page).toHaveURL('/uppdrag/viewuppdrag');

    // can edit your own uppdrag
    await page.getByRole('button', { name: 'Redigera'}).click();
    await expect(page).toHaveURL('/uppdrag/edituppdrag/clf15spkz000cxevoe1n23743');
});
