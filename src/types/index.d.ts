export default {};

declare global {
  interface TaskDataForm {
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string | null | date;
  }
}
