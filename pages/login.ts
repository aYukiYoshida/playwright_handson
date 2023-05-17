import { Page, Locator } from "playwright";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = page.getByRole("textbox", { name: "username" });
    this.passwordTextBox = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameTextBox.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordTextBox.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
