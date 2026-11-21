import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly appNameSelect: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.appNameSelect = page.getByLabel('App Name:');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open(url: string): Promise<void> {
    await this.goto(url, 30_000);
  }

  async login(
    username: string,
    password: string,
    appName: string,
  ): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.selectOption(this.appNameSelect, appName);

    await Promise.all([
      this.page.waitForURL(/Banking-Project-Demo\.html/, {
        waitUntil: 'domcontentloaded',
      }),
      this.click(this.loginButton),
    ]);
  }
}
