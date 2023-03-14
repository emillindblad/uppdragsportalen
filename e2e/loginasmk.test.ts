import { test, expect } from '@playwright/test';

test.describe.parallel('logged in as mk', () => {
    test.use({storageState: './e2e/setup/mk.json'})
        test('Login as mk', async ({ page, context }) => {
            await page.goto('/review');
            await expect(page).toHaveURL('/review');
            await expect(page.getByRole('button', { name: 'Konton' })).toHaveText('Konton');
            await expect(page.getByRole('button', { name: 'Granska' })).toHaveText('Granska');

            await page.getByRole('button', { name: 'Konton' }).click();
            await expect(page).toHaveURL('/accounts');
        });
        test('View specific uppdrag as MK', async ({ page, context }) => {
            await page.goto('/archive')
            await page.getByText('Komma på dessa fake uppdrag').click();
            await expect(page.getByRole('button', { name: 'Skicka' })).toHaveText('Skicka');
        });

        test('See account page as MK', async ({ page, context }) => {
            await page.goto('/accounts')
            await expect(page).toHaveURL('/accounts');
        });
})
