import { test, expect } from "@playwright/test";

test.describe("Access to TESEUS", () => {
  test.beforeEach(async ({ page }) => {
    // arranges
    await page.goto("/");
  });

  test("アプリケーションを開く", async ({ page, baseURL }) => {
    // asserts
    await test.step("ログインページに遷移する", async () => {
      await expect(page).toHaveURL(baseURL + "/login");
    });
  });

  test("正当なユーザー名とパスワードでログインする", async ({
    page,
    baseURL,
  }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await page.getByRole("textbox", { name: "username" }).fill("pulsar");
      await page.getByRole("textbox", { name: "password" }).fill("neutronstar");
    });
    await test.step("ログインボタンを押下する", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに成功する", async () => {
      await expect(page).toHaveURL(baseURL + "/status");
      await expect(page.getByTestId("status")).toHaveText("Success to login.");
    });
  });

  test("登録がないユーザー名でログインする", async ({ page, baseURL }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await page.getByRole("textbox", { name: "username" }).fill("magnetar");
      await page.getByRole("textbox", { name: "password" }).fill("neutronstar");
    });
    await test.step("ログインボタンを押下する", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(page).toHaveURL(baseURL + "/status");
      await expect(page.getByTestId("status")).toHaveText(
        "Incorrect username or password."
      );
    });
  });

  test("不正なパスワードでログインする", async ({ page, baseURL }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力", async () => {
      await page.getByRole("textbox", { name: "username" }).fill("magnetar");
      await page.getByRole("textbox", { name: "password" }).fill("blackhole");
    });
    await test.step("ログインボタンを押下する", async () => {
      await page.getByRole("button", { name: "Login" }).click();
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(page).toHaveURL(baseURL + "/status");
      await expect(page.getByTestId("status")).toHaveText(
        "Incorrect username or password."
      );
    });
  });
});
