import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
  private readonly transactionTypeSelect: Locator;
  private readonly amountInput: Locator;
  private readonly transferToInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly submitButton: Locator;
  private readonly confirmationHeading: Locator;
  private readonly confirmButton: Locator;
  private readonly successHeading: Locator;
  private readonly referenceRow: Locator;

  constructor(page: Page) {
    super(page);
    this.transactionTypeSelect = page.getByLabel('Transaction Type:');
    this.amountInput = page.getByRole('spinbutton', { name: 'Amount ($): *' });
    this.transferToInput = page.getByRole('textbox', {
      name: 'Transfer to Account: *',
    });
    this.descriptionInput = page.getByRole('textbox', {
      name: 'Description: *',
    });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.confirmationHeading = page.getByRole('heading', {
      name: '🔍 Transaction Confirmation',
      level: 2,
    });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.successHeading = page.getByRole('heading', {
      name: '✅ Transaction Successful',
      level: 2,
    });
    this.referenceRow = page
      .getByText('Transaction Reference:', { exact: true })
      .locator('..');
  }

  async createTransfer(
    transactionType: string,
    amount: string,
    account: string,
    description: string,
  ): Promise<void> {
    await this.selectOption(this.transactionTypeSelect, transactionType);
    await this.fill(this.amountInput, amount);
    await this.fill(this.transferToInput, account);
    await this.fill(this.descriptionInput, description);
    await this.click(this.submitButton);
  }

  async confirmTransfer(): Promise<string> {
    await this.expectVisible(this.confirmationHeading);
    await this.click(this.confirmButton);
    await this.expectVisible(this.successHeading);
    await this.expectVisible(this.referenceRow);
    await expect(this.referenceRow).toContainText(/TXN-\d+-\d+/);

    const referenceText = await this.referenceRow.textContent();
    const referenceMatch = referenceText?.match(/TXN-\d+-\d+/);
    expect(
      referenceMatch,
      'Transaction Reference should be displayed after confirmation',
    ).not.toBeNull();

    return referenceMatch![0];
  }
}
