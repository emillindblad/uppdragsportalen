import { test, expect } from '@playwright/test';

test.describe.parallel('logged in as nollk', () => {
    test.use({storageState: './e2e/setup/nollk.json'})
    test('login as nollk and show correct buttons', async ({ page }) => {
        //show correct buttons (that differ from admin-view)
        await page.goto('/home');
        await expect(page).toHaveURL('/home');
        await expect(page.getByRole('button', { name: 'Mina Nolluppdrag' })).toHaveText('Mina Nolluppdrag');
        await expect(page.getByRole('button', { name: 'Arkiv' })).toHaveText('Arkiv');

        // check that arkiv button navigates correct
        await page.getByRole('button', { name: 'Arkiv'}).click();
        await expect(page).toHaveURL('/archive');
    });

    test('filter table by asc, desc, default order', async ({ page }) => {

        await page.goto('/home');
        // show ascending order arrow
        await page.getByText('Namn på uppdrag').click();
        await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag ↓');

        // show descending order arrow
        await page.getByText('Namn på uppdrag ↓').click();
        await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag ↑');

        // show defalut order (no arrow)
        await page.getByText('Namn på uppdrag ↑').click();
        await expect(page.getByText('Namn på uppdrag')).toHaveText('Namn på uppdrag');
    });

    test('search after an uppdrag', async ({ page }) => {
        await page.goto('/home');
        // search for 'oo'
        await page.locator('input[name="search"]').fill('oo');
        await expect(page.locator('input[name="search"]')).toHaveValue('oo');

        // show only uppdrag containing 'oo'
        await expect(page.getByText('foobar123falseAPPROVED')).toBeVisible();
        await expect(page.getByText('WooplkjasfdasdfalseAPPROVED')).toBeVisible();
        await expect(page.getByText('Ännu ett uppdrag')).toBeHidden();

        // click on one uppdrag and see its info
        await page.getByText('foo').click();
        await expect(page).toHaveURL('/uppdrag/viewuppdrag/clf2dio910000l708fb6m7nvl');

        await expect(page.getByText('Antal deltagare:1')).toBeVisible();
        await expect(page.getByText('Plats:bar')).toBeVisible();
        await expect(page.getByText('Tid:123')).toBeVisible();
        await expect(page.getByText('Status:APPROVED')).toBeVisible();
        await expect(page.getByText('Privat:false')).toBeVisible();
        await expect(page.getByText('Beskrivning:2')).toBeVisible();
        await expect(page.getByText('Motivering:2')).toBeVisible();
        await expect(page.getByText('Kommentar:asdfasdf')).toBeVisible();

        await expect(page.getByText('Emil Lindblad, 2023')).toBeVisible();
        await expect(page.getByText('uppdrag.nollkit@chalmers.it').nth(1)).toBeVisible();

        await page.getByRole('button', { name: 'Tillbaka' }).click();
        await expect(page).toHaveURL('/home');
    });


    test('edit your own uppdrag', async ({ page }) => {
        // navigate to a uppdrag
        await page.goto('/home');
        await page.getByText('Ännu ett uppdrag').click();
        await expect(page).toHaveURL('/uppdrag/viewuppdrag/clf15spkz000cxevoe1n23743');

        // can edit your own uppdrag
        await page.getByRole('button', { name: 'Redigera'}).click();
        await expect(page).toHaveURL('/uppdrag/edituppdrag/clf15spkz000cxevoe1n23743');
    });


    test('cant edit another nollk:s uppdrag', async ({ page }) => {
        await page.goto('/home');
        // navigate to all nolluppdrag
        await page.getByRole('button', { name: 'Årets Nolluppdrag'}).click();
        await expect(page).toHaveURL('/chalmers');

        // can not edit another nollk:s uppdrag
        await page.getByText('Ett dnollk uppdrag').click();
        await expect(page).toHaveURL('/uppdrag/viewuppdrag/clf6yxs8o0002rxzfcza86c6k');
        await expect(page.getByRole('button', { name: 'Redigera'})).toBeHidden();
    });
});
