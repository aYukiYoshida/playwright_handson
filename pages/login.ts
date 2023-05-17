import { Page, Locator } from "playwright";
import { StatusPage } from "./status";

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

export class FluentLoginPage {
  queue: Promise<any>;
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.queue = Promise.resolve();
    this.page = page;
    this.usernameTextBox = page.getByRole("textbox", { name: "username" });
    this.passwordTextBox = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  _chain(callback, object) {
    this.queue = this.queue.then(callback);
    return object;
  }

  then(callback) {
    return callback(this.queue);
  }

  goto(): FluentLoginPage {
    return this._chain(async () => await this.page.goto("/"), this);
  }

  enterUsername(username: string): FluentLoginPage {
    return this._chain(
      async () => await this.usernameTextBox.fill(username),
      this
    );
  }

  enterPassword(password: string): FluentLoginPage {
    return this._chain(
      async () => await this.passwordTextBox.fill(password),
      this
    );
  }

  clickLoginButton(): StatusPage {
    return this._chain(
      async () => await this.loginButton.click(),
      new StatusPage(this.page)
    );
  }
}
