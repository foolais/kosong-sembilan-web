import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return Response.json({ message: "Tidak sah" }, { status: 401 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = verifyRefreshToken(refreshToken) as any;

    const accessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30,
      path: "/",
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan",
        error,
      },
      { status: 500 }
    );
  }
}
