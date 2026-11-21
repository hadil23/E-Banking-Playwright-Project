import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly applicationHeading: Locator;
  private readonly welcomeText: Locator;
  private readonly quickTransactionsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationHeading = page.getByRole('heading', {
      name: '🏦 Sample Banking Application',
      level: 1,
    });
    this.welcomeText = page.getByText(
      'Welcome to the Testers Talk Banking Application',
      { exact: true },
    );
    this.quickTransactionsLink = page.getByRole('link', {
      name: '💳 Quick Transactions',
    });
  }

  async verifyLoaded(): Promise<void> {
    await this.expectVisible(this.applicationHeading);
    await this.expectVisible(this.welcomeText);
  }

  async openQuickTransactions(): Promise<void> {
    await this.click(this.quickTransactionsLink);
  }
}
