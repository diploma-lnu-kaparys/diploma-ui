class ServiceBase {
  protected static parseCommandVariables<T>(variables: object, command: T): T {
    for (const [key, value] of Object.entries(variables)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      command[key] = value;
    }

    return command;
  }
}

export default ServiceBase;
