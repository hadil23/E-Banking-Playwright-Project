import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import config from '../config.json';
import transferTestData from '../test-data/Transfer_TestData.json';

test('Transaction History page should show the confirmed transfer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);
  const transactionHistoryPage = new TransactionHistoryPage(page);

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
  const transactionReference = await quickTransactionPage.confirmTransfer();

  await transactionHistoryPage.openHistory();
  await transactionHistoryPage.verifyReference(transactionReference);
});
