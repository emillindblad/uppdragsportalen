// auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('uppdrag.nollkit@chalmers.it');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('1234');
    await page.getByRole('button', { name: 'Logga in' }).click();
    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});