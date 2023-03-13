import { test, expect } from '@playwright/test';

test('login page', async ({ page }) => {
    await page.goto('/login');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Uppdragsportalen - Mottagningskommittén");
    await expect(page.getByRole('button', { name: 'Logga in' })).toHaveText('Logga in')
});

test('login as mk', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('pr@mk.chs.chalmers.se');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();

    await expect(page).toHaveURL('/review');
    await expect(page.getByRole('button', { name: 'Konton' })).toHaveText('Konton')
    await expect(page.getByRole('button', { name: 'Granska' })).toHaveText('Granska')

    await page.getByRole('button', { name: 'Konton' }).click();
    await expect(page).toHaveURL('/accounts');
});

test('view specific uppdrag', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('pr@mk.chs.chalmers.se');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();

    await page.goto('http://localhost:3000/review');
    await expect(page).toHaveURL('/review');

    await page.getByRole('link', {name : 'Komma på dessa fake uppdrag'}).click();
    await
    




});
