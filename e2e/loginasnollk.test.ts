import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // page is authenticated
});

test('login as nollk', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();
    
    await expect(page).toHaveURL('/home');
    await expect(page.getByRole('button', { name: 'Mina nolluppdrag' })).toHaveText('Mina nolluppdrag');
    await expect(page.getByRole('button', { name: 'Arkiv' })).toHaveText('Arkiv');
    
    await page.getByRole('button', { name: 'Arkiv'}).click();
    await expect(page).toHaveURL('/archive');
  });


test('filter table by asc, desc, default order', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await expect(page).toHaveURL('/home');

    await page.getByText('Namn på uppdrag').click();
    await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag ↓');

    // await page.getByText('Namn på uppdrag ↓').click();
    // await expect(page.getByText('Namn på uppdrag ↓')).toHaveText('Namn på uppdrag ↑');

    // await page.getByText('Namn på uppdrag ↑').click();
    // await expect(page.getByText('Namn på uppdrag ↑')).toHaveText('Namn på uppdrag');

  });

// test('search after an uppdrag', async ({ page }) => {
//     await page.goto('http://localhost:3000/login');
//     await page.locator('input[name="email"]').click();
//     await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
//     await page.locator('input[name="password"]').click();
//     await page.locator('input[name="password"]').fill('1234');
//     await page.getByRole('button', { name: 'Logga in' }).click();

//     // await page.getByPlaceholder('Sök..').click();
//     // await page.getByPlaceholder('Sök..').fill('oo');

//     // await page.locator('input[name="search"]').click();
//     await page.locator('input[name="search"]').fill('oo');
//     await page.waitForLoadState();
//     await expect(page.locator('input[name="search"]')).toHaveValue('oo');
    
//     // await expect(page).toHaveURL('/home');
//     // await expect(page.getByText('oo')).toBeVisible();
//     // await expect(page.getByText('foobar123falseAPPROVEDWooplkjasfdasdfalseSUBMITTED')).toBeVisible();
//     // await expect(page.getByText('Ännu ett uppdragCampusUnder MV3falseAPPROVEDBrITney SpearsCampusMottagningenfals')).toHaveText('foobar123falseAPPROVEDWooplkjasfdasdfalseSUBMITTED');

//     // await page.getByText('foo').click();
//     // await expect(page).toHaveURL('/uppdrag/viewuppdrag');
//     // await expect(page).toContain('Antal deltagare: 1 Plats: bar Tid: 123 Motivation: 2 Status: APPROVED Privat: false');

//   });