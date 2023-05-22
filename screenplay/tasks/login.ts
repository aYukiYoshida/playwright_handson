import { Actor, Task } from "@testla/screenplay";
import { Fill, Click } from "@testla/screenplay-playwright/web";
import { LoginPage } from "../screens";

export class Login extends Task {
  private constructor(private username: string, private password: string) {
    super();
  }

  // the actual implementation of the task
  public async performAs(actor: Actor): Promise<any> {
    const loginPage = actor.states("loginPage") as LoginPage;
    return actor.attemptsTo(
      Fill.in(loginPage.usernameTextBox, this.username),
      Fill.in(loginPage.passwordTextBox, this.password),
      Click.on(loginPage.loginButton)
    );
  }

  // static member method to invoke the task
  public static to(username: string, password: string): Login {
    return new Login(username, password);
  }
}
