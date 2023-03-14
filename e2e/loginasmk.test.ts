import { test, expect } from '@playwright/test';

test('login page', async ({ page }) => {
    await page.goto('/login');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Uppdragsportalen - Mottagningskommittén");
    await expect(page.getByRole('button', { name: 'Logga in' })).toHaveText('Logga in');
});

test('Login as mk', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('pr@mk.chs.chalmers.se');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();

    await expect(page).toHaveURL('/review');
    await expect(page.getByRole('button', { name: 'Konton' })).toHaveText('Konton');
    await expect(page.getByRole('button', { name: 'Granska' })).toHaveText('Granska');

    await page.getByRole('button', { name: 'Konton' }).click();
    await expect(page).toHaveURL('/accounts');
});

test('View specific uppdrag as MK', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('pr@mk.chs.chalmers.se');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();

    await expect(page).toHaveURL('/review');
    await page.getByText('Komma på dessa fake uppdrag').click();
    await expect(page.getByRole('button', { name: 'Skicka' })).toHaveText('Skicka');
    
    await page.getByRole('button', { name: 'Konton' }).click();
    await expect(page).toHaveURL('/accounts');



});

test('See account page as MK', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('pr@mk.chs.chalmers.se');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();
    
    await page.getByRole('button', { name: 'Konton' }).click();
    await expect(page).toHaveURL('/accounts');



});
