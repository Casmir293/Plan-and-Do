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

  // interface User {
  //   auth: string;
  //   email: string;
  // }

  interface Toast {
    id?: string;
    message: string;
    type?: string;
    timeout?: number;
  }
}
