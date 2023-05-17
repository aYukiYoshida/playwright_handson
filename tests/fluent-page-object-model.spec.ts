import { test as base, expect } from "@playwright/test";
import { FluentLoginPage } from "../pages/login";
import { StatusPage } from "../pages/status";

const test = base.extend<{
  loginPage: FluentLoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new FluentLoginPage(page);
    await use(loginPage);
  },
});

test.describe("Fluent Page Object Model Design Pattern", () => {
  test("アプリケーションを開く", async ({ loginPage, baseURL }) => {
    // asserts
    await test.step("ログインページに遷移する", async () => {
      await expect(loginPage.goto().page).toHaveURL(baseURL + "/login");
    });
  });

  test("正当なユーザー名とパスワードでログインする", async ({
    loginPage,
    baseURL,
  }) => {
    await test.step("ステータスページに遷移し、ログインに成功する", async () => {
      // actions
      const statusPage: StatusPage = loginPage
        .goto()
        .enterUsername("pulsar")
        .enterPassword("neutronstar")
        .clickLoginButton();

      // asserts
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText("Success to login.");
    });
  });

  test("登録がないユーザー名でログインする", async ({ loginPage, baseURL }) => {
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      // actions
      const statusPage: StatusPage = loginPage
        .goto()
        .enterUsername("magnetar")
        .enterPassword("neutronstar")
        .clickLoginButton();

      // asserts
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText(
        "Incorrect username or password."
      );
    });
  });

  test("不正なパスワードでログインする", async ({ loginPage, baseURL }) => {
    await test.step("ユーザー名とパスワードを入力", async () => {
      // actions
      const statusPage: StatusPage = loginPage
        .goto()
        .enterUsername("pulsar")
        .enterPassword("blackhole")
        .clickLoginButton();

      // asserts
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText(
        "Incorrect username or password."
      );
    });
  });
});
