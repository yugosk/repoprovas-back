export interface IAppError {
  code: number;
  message: string;
}

export function errorHandler(error: string | object): IAppError {
  const response = {
    code: 500,
    message: "",
  };
  switch (error) {
    case "invalid_email":
      response.code = 409;
      response.message = "This email is already in use";
      break;
    case "email_not_found":
      response.code = 404;
      response.message = "This email is not registered to an account";
      break;
    case "incorrect_password":
      response.code = 401;
      response.message = "Incorrect password";
      break;
    default:
      response.message =
        "There was an issue connecting to the server, try again later";
  }
  return response;
}
