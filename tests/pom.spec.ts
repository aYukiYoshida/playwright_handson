import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { StatusPage } from "../pages/status";

const test = base.extend<{
  loginPage: LoginPage;
  statusPage: StatusPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  statusPage: async ({ page }, use) => {
    const statusPage = new StatusPage(page);
    await use(statusPage);
  },
});

test.describe("Page Object Model Design Pattern", () => {
  test("アプリケーションを開く", async ({ loginPage, baseURL }) => {
    // asserts
    await test.step("ログインページに遷移する", async () => {
      await expect(loginPage.page).toHaveURL(baseURL + "/login");
    });
  });

  test("正当なユーザー名とパスワードでログインする", async ({
    loginPage,
    statusPage,
    baseURL,
  }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await loginPage.enterUsername("pulsar");
      await loginPage.enterPassword("neutronstar");
    });
    await test.step("ログインボタンを押下する", async () => {
      await loginPage.clickLoginButton();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに成功する", async () => {
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText("Success to login.");
    });
  });

  test("登録がないユーザー名でログインする", async ({
    loginPage,
    statusPage,
    baseURL,
  }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await loginPage.enterUsername("magnetar");
      await loginPage.enterPassword("neutronstar");
    });
    await test.step("ログインボタンを押下する", async () => {
      await loginPage.clickLoginButton();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText(
        "Incorrect username or password."
      );
    });
  });

  test("不正なパスワードでログインする", async ({
    loginPage,
    statusPage,
    baseURL,
  }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await loginPage.enterUsername("pulsar");
      await loginPage.enterPassword("blackhole");
    });
    await test.step("ログインボタンを押下する", async () => {
      await loginPage.clickLoginButton();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(statusPage.page).toHaveURL(baseURL + "/status");
      await expect(statusPage.status).toHaveText(
        "Incorrect username or password."
      );
    });
  });
});
