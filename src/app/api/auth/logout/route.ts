import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", {
    expires: new Date(0),
    path: "/",
  });

  cookieStore.set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
  });

  return Response.json({
    success: true,
    message: "Berhasil logout",
  });
}
