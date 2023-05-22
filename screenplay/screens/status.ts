import { Page, Locator } from "playwright";

export class StatusPage {
  readonly page: Page;
  readonly status: Locator;

  constructor(page: Page) {
    this.page = page;
    this.status = page.getByTestId("status");
  }
}
