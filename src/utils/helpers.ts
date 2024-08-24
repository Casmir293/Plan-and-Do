// CONSOLE.LOG IN DEVELOPMENT MODE
export const logger = (...arg: any) => {
  if (import.meta.env.MODE !== "production") {
    console.log(JSON.stringify(arg, null, 2));
  }
};
