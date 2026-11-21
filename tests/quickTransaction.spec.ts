import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import config from '../config.json';
import transferTestData from '../test-data/Transfer_TestData.json';

test('Quick Transaction page should create and confirm a transfer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);

  await loginPage.open(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await homePage.verifyLoaded();
  await homePage.openQuickTransactions();

  await quickTransactionPage.createTransfer(
    transferTestData.transactionType,
    transferTestData.amount,
    transferTestData.account,
    transferTestData.description,
  );
  await quickTransactionPage.confirmTransfer();
});
