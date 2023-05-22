import { test as base, expect } from "@playwright/test";
import { Actor } from "@testla/screenplay";
import { BrowseTheWeb, Navigate } from "@testla/screenplay-playwright/web";
import { LoginPage, StatusPage } from "../screenplay/screens";
import { Login } from "../screenplay/tasks";
import { LoginStatus } from "../screenplay/questions";

const test = base.extend<{
  actor: Actor;
}>({
  actor: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const statusPage = new StatusPage(page);
    const actor = Actor.named("tester")
      .can(BrowseTheWeb.using(page))
      .with("page", page)
      .with("loginPage", loginPage)
      .with("statusPage", statusPage);
    await actor.attemptsTo(Navigate.to("/"));
    await use(actor);
  },
});

test.describe("Screenplay Design Pattern", () => {
  test("アプリケーションを開く", async ({ actor, baseURL }) => {
    // asserts
    await test.step("ログインページに遷移する", async () => {
      await expect(actor.states("page")).toHaveURL(baseURL + "/login");
    });
  });

  test("正当なユーザー名とパスワードでログインする", async ({
    actor,
    baseURL,
  }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力後、ログインボタンを押下する", async () => {
      await actor.attemptsTo(Login.to("pulsar", "neutronstar"));
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに成功する", async () => {
      await expect(actor.states("page")).toHaveURL(baseURL + "/status");
      await actor.asks(LoginStatus.toBe.success());
    });
  });

  test("登録がないユーザー名でログインする", async ({ actor, baseURL }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力後、ログインボタンを押下する", async () => {
      await actor.attemptsTo(Login.to("magnetar", "neutronstar"));
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(actor.states("page")).toHaveURL(baseURL + "/status");
      await actor.asks(LoginStatus.toBe.failure());

      await expect(actor.states("statusPage").status).toHaveText(
        "Incorrect username or password."
      );
    });
  });

  test("不正なパスワードでログインする", async ({ actor, baseURL }) => {
    // actions
    await test.step("ユーザー名とパスワードを入力後、ログインボタンを押下する", async () => {
      await actor.attemptsTo(Login.to("pulsar", "blackhole"));
    });

    // asserts
    await test.step("ステータスページに遷移し、ログインに失敗する", async () => {
      await expect(actor.states("page")).toHaveURL(baseURL + "/status");
      await actor.asks(LoginStatus.toBe.failure());
    });
  });
});
