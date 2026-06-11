import { connectDB } from "@/lib/mongodb";
import Family from "@/models/Family";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const search = req.nextUrl.searchParams.get("cari");
    const page = Number(req.nextUrl.searchParams.get("halaman") || 1);
    const limit = Number(req.nextUrl.searchParams.get("batas") || 10);

    const query = search
      ? {
          $or: [
            {
              headFamily: {
                $regex: search,
                $options: "i",
              },
            },
            {
              "members.name": {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const skip = (page - 1) * limit;
    const total = await Family.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const families = await Family.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return Response.json({
      success: true,
      data: families,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.log({ error });
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

export async function POST(req: Request) {
  try {
    await connectDB();

    const { headFamily, status, members } = await req.json();

    const family = await Family.create({
      headFamily,
      status,
      members,
    });

    return Response.json(
      {
        success: true,
        data: family,
        message: "Data keeluarga berhasil ditambahkan",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
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
