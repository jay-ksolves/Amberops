
// This function can be imported and used across all frontend applications.
export const log = (message: string, ...args: any[]) => {
  if (process.env.NEXT_PUBLIC_LOGGING_ENABLED === 'true') {
    console.log(message, ...args);
  }
};
