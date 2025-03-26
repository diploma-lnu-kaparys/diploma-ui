import {
  ICreateTodoListCommand,
  CreateTodoListCommand,
  IUpdateTodoListCommand,
  UpdateTodoListCommand
} from "@diploma-lnu-kaparys/diploma-api-client";
import ServiceBase from "./ServiceBase";
import { todoListsClient } from "../api/ApiClients";

class TodoListsService extends ServiceBase {
  async getTodoLists() {
    return todoListsClient.getTodoLists();
  }

  async createTodoList(variables: ICreateTodoListCommand) {
    const command = CreateTodoListCommand.fromJS(variables);
    return todoListsClient.createTodoList(command);
  }

  async updateTodoList(variables: IUpdateTodoListCommand) {
    const command = UpdateTodoListCommand.fromJS(variables);
    return todoListsClient.updateTodoList(command.id as number, command);
  }

  async deleteTodoList(todoListId: number) {
    return todoListsClient.deleteTodoList(todoListId);
  }
}

export default new TodoListsService();
