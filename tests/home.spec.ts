import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import config from '../config.json';

test('Home page should display banking information and open Quick Transactions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.open(config.url);
  await loginPage.login(config.username, config.password, config.appName);

  await homePage.verifyLoaded();
  await homePage.openQuickTransactions();
});
