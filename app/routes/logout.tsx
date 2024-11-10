import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { signOut } from "~/lib/supabase/auth.supabase.server.ts";

export const loader = async () => redirect("/");

export const action = async ({ request }: ActionFunctionArgs) => signOut(request);