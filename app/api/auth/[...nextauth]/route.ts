import { GET as AuthGET, POST as AuthPOST } from "@/lib/auth";

const handlers = {
  GET: AuthGET,
  POST: AuthPOST,
};

export const { GET, POST } = handlers;
