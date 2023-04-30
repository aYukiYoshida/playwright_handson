import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // arranges
  await page.goto("/");
});

test.describe("Access to TESEUS", () => {
  test("ログインページに遷移する", async ({ page, baseURL }) => {
    await expect(page).toHaveURL(baseURL + "/login");
  });

  test("正当なユーザー名とパスワードでログインする", async ({
    page,
    baseURL,
  }) => {
    // actions
    await page.getByTestId("username").fill("pulsar");
    await page.getByTestId("password").fill("neutronstar");
    await page.getByRole("button", { name: "Login" }).click();

    // asserts
    await expect(page).toHaveURL(baseURL + "/status");
    await expect(page.getByTestId("status")).toHaveText("Success to login.");
  });

  test("登録がないユーザー名でログインする", async ({ page, baseURL }) => {
    // actions
    await page.getByTestId("username").fill("magnetar");
    await page.getByTestId("password").fill("neutronstar");
    await page.getByRole("button", { name: "Login" }).click();

    // asserts
    await expect(page).toHaveURL(baseURL + "/status");
    await expect(page.getByTestId("status")).toHaveText(
      "Incorrect username or password."
    );
  });

  test("不正なパスワードでログインする", async ({ page, baseURL }) => {
    // actions
    await page.getByTestId("username").fill("pulsar");
    await page.getByTestId("password").fill("blackhole");
    await page.getByRole("button", { name: "Login" }).click();

    // asserts
    await expect(page).toHaveURL(baseURL + "/status");
    await expect(page.getByTestId("status")).toHaveText(
      "Incorrect username or password."
    );
  });
});
