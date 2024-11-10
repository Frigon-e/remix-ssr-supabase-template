import {
  CookieOptions,
  createServerClient,
  GetAllCookies
} from "@supabase/ssr";
import { parse, serialize } from "cookie";

export function createSupabaseServerClient(request: Request, responseHeaders: Headers) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

  const getAll: GetAllCookies = async () => {
    const cookieHeader = request.headers.get('Cookie') ?? '';
    const parsedCookies = parse(cookieHeader);

    // Return in the required format: { name: string; value: string }[]
    return Object.entries(parsedCookies).map(([name, value]) => ({ name, value }));
  };

  const setAll = async (cookies: { name: string; value: string; options?: CookieOptions}[]) => {
    cookies.forEach(({ name, value, options }) => {
      const cookieString = serialize(name, value, options);
      responseHeaders.append('Set-Cookie', cookieString);
    });
  };

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {getAll, setAll},
  });

  return { supabase, responseHeaders };
}
