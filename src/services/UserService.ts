import {
  CompleteSignUpCommand,
  ICompleteSignUpCommand,
  IPreSignUpCommand,
  IResendVerificationCommand,
  ISignInCommand,
  PreSignUpCommand,
  ResendVerificationCommand,
  SignInCommand,
  UserInfoDto
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

  async resendCode(variables: IResendVerificationCommand) {
    const command = ResendVerificationCommand.fromJS(variables);
    return usersClient.resendVerification(command);
  }

  async userInfo(id: number): Promise<UserInfoDto> {
    return usersClient.getUserInfo(id);
  }
}

export default new UserService();
