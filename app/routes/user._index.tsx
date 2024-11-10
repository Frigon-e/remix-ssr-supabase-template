import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/lib/supabase/supabase.server.ts";
import { useState } from "react";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {supabase} = createSupabaseServerClient(request, new Headers());
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Response('Unauthorized', {status: 401});
  }

  return json(user);

}

export default function UserIndex() {
  const {data} = useLoaderData<typeof loader>();

  const [email, _] = useState(() => data.user ? data.user.email : 'Unknown Email');

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1
          className="text-3xl font-bold underline pb-5">Welcome {email} </h1>
        <p>You are now logged in using Supabase Auth.</p>
      </div>
      <div>
        <p>
          <Link className="bg-sky-500 rounded p-2" to="account">
            User Account
          </Link>{" "}
          to access your user information
        </p>
      </div>
      <div>
        <p>
          <Form action="/logout" method="post">
            <button className="bg-sky-500 rounded p-2" type="submit">
              Sign Out
            </button>
          </Form>
        </p>
      </div>
    </div>
  );
}