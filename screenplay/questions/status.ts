import { Actor, Question } from "@testla/screenplay";
import { expect } from "@playwright/test";
import { StatusPage } from "../screens";

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class LoginStatus extends Question<boolean> {
  // the selector of the element to check.
  private message: string;

  private constructor(private checkMode: "toBe" | "notToBe") {
    super();
  }

  /**
   * Verifies if an element.
   *
   * @param {Actor} actor the actor
   * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    let success = false;
    const statusPage = actor.states("statusPage") as StatusPage;
    try {
      await expect(statusPage.status).toHaveText(this.message);
      success = true;
    } catch (e) {
      // do nothing
    }
    expect(success).toBe(this.checkMode === "toBe");
    return true;
  }

  /**
   * make the Question check for the positive.
   * @return {LoginStatus} new LoginStatus instance
   */
  static get toBe() {
    return new LoginStatus("toBe");
  }

  /**
   * make the Question check for the negative.
   * @return {LoginStatus} new LoginStatus instance
   */
  static get notToBe() {
    return new LoginStatus("notToBe");
  }

  /**
   * Verifies if an element is visible.
   *
   * @param {Locator} locator the locator
   * @return {LoginStatus} this LoginStatus instance
   */
  public success(): LoginStatus {
    this.message = "Success to login.";
    return this;
  }

  public failure(): LoginStatus {
    this.message = "Incorrect username or password.";
    return this;
  }
}
