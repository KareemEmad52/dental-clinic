import { ActionResponse } from "@/types/types";

export const actionSuccess = <T = any>(
  message: string,
  data?: T,
  code?: number
): ActionResponse<T> => ({
  success: true,
  message,
  data,
  code: code || 200,
});

export const actionError = (
  message: string,
  error?: any,
  code?: number
): ActionResponse => {
  console.log("Action Error:", error);
  return {
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? error?.message : undefined,
    code: code || 400,
  };
};