import type { Browser, FullConfig } from '@playwright/test';
import { chromium } from '@playwright/test';

async function globalSetup (config: FullConfig) {
    const browserMk = await chromium.launch()
    await saveStorage(browserMk, 'pr@mk.chs.chalmers.se', '1234', './e2e/setup/mk.json')
    await browserMk.close()
    const browserNollk = await chromium.launch()
    await saveStorage(browserNollk, 'uppdrag.nollkit@chalmers.it', '1234', './e2e/setup/nollk.json')
    await browserNollk.close()
}

async function saveStorage (browser: Browser, email: string, password: string, saveStoragePath: string) {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('link', { name: 'Glömt lösenord?' }).press('Tab');
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Logga in' }).click();

    await page.waitForNavigation();
    await page.context().storageState({ path: saveStoragePath })
}

export default globalSetup
