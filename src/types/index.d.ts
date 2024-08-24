export default {};

declare global {
  interface TaskDataForm {
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string | null | date;
  }

  interface SignupDataForm {
    name: string;
    email: string;
    password: string;
  }

  interface SigninDataForm {
    email: string;
    password: string;
  }

  type UserId = string | null;

  interface MyProfile {
    name: string;
    email: string;
  }

  interface ErrorResponse {
    code: number;
    message: string;
  }
}
