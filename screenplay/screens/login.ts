import { Page, Locator } from "playwright";

export class LoginPage {
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameTextBox = page.getByRole("textbox", { name: "username" });
    this.passwordTextBox = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }
}
