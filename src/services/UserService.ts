import {
  CompleteSignUpCommand,
  ICompleteSignUpCommand,
  IPreSignUpCommand,
  ISignInCommand,
  PreSignUpCommand,
  SignInCommand
} from "@diploma-lnu-kaparys/diploma-api-client";
import { usersClient } from "../api/ApiClients";
import ServiceBase from "./ServiceBase";

class UserService extends ServiceBase {
  async signIn(variables: ISignInCommand) {
    return usersClient.signIn(SignInCommand.fromJS(variables));
  }

  async preCoachSignUp(variables: IPreSignUpCommand) {
    const command = PreSignUpCommand.fromJS(variables);
    return usersClient.preSignUp(command);
  }

  async completeCoachSignUp(variables: ICompleteSignUpCommand) {
    const command = CompleteSignUpCommand.fromJS(variables);
    return usersClient.completeSignUp(command);
  }
}

export default new UserService();
