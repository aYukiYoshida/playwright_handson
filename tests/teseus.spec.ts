import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // arranges
  await page.goto("http://localhost:8888/");
});

test.describe("Login to", () => {
  test("ログインページに遷移する", async ({ page }) => {
    await expect(page).toHaveURL(/login$/);
  });

  test("正当なユーザー名とパスワードでログインする", async ({ page }) => {
    // actions
    await page.getByTestId("username").fill("pulsar");
    await page.getByTestId("password").fill("neutronstar");
    await page.getByRole("button", { name: "Login" }).click();

    // assertions
    await expect(page.getByTestId("status")).toHaveText("Success to login.");
  });

  test("登録がないユーザー名でログインする", async ({ page }) => {
    // actions
    await page.getByTestId("username").fill("magnetar");
    await page.getByTestId("password").fill("neutronstar");
    await page.getByRole("button", { name: "Login" }).click();

    // assertions
    await expect(page.getByTestId("status")).toHaveText(
      "Incorrect username or password."
    );
  });

  test("不正なパスワードでログインする", async ({ page }) => {
    // actions
    await page.getByTestId("username").fill("magnetar");
    await page.getByTestId("password").fill("blackhole");
    await page.getByRole("button", { name: "Login" }).click();

    // assertions
    await expect(page.getByTestId("status")).toHaveText(
      "Incorrect username or password."
    );
  });
});
