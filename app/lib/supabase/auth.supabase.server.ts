import { json, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/lib/supabase/supabase.server.ts";

export const signInWithPassword = async (
  request: Request,
  successRedirectPath: string
) => {
  const responseHeaders = new Headers();
  const {supabase} = createSupabaseServerClient(request, responseHeaders);
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (!error) {
    throw redirect(successRedirectPath, {headers: responseHeaders});
  }

  return json({error: error.message}, {headers: responseHeaders});
};

export const signOut = async (
  request: Request,
  successRedirectPath: string = '/'
) => {
  const responseHeaders = new Headers();
  const {supabase} = createSupabaseServerClient(request, responseHeaders);
  const {error} = await supabase.auth.signOut();

  if (!error) {
    throw redirect(successRedirectPath, {headers: responseHeaders});
  }

  return json({error: error.message}, {headers: responseHeaders});
};

export const getUser = async (request: Request) => {
  const responseHeaders = new Headers();
  const {supabase} = createSupabaseServerClient(request, responseHeaders);
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return user || null;
};

export const isUserLoggedIn = async (request: Request) => {
  const responseHeaders = new Headers();
  const {supabase} = createSupabaseServerClient(request, responseHeaders);
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return !!user;
};
