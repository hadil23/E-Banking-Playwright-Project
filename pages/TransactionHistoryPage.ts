import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  private readonly viewHistoryButton: Locator;
  private readonly historyHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.viewHistoryButton = page.getByRole('button', { name: 'View History' });
    this.historyHeading = page.getByRole('heading', {
      name: '📊 Transaction History',
      level: 2,
    });
  }

  async openHistory(): Promise<void> {
    await this.click(this.viewHistoryButton);
  }

  async verifyReference(transactionReference: string): Promise<void> {
    await this.expectVisible(this.historyHeading);
    await this.expectVisible(
      this.page.getByText(new RegExp(`Ref:\\s*${transactionReference}`)),
    );
  }
}
