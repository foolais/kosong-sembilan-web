import { connectDB } from "@/lib/mongodb";
import Family, { IFamilyStatus } from "@/models/Family";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const search = req.nextUrl.searchParams.get("cari");
    const page = Number(req.nextUrl.searchParams.get("halaman") || 1);
    const status = req.nextUrl.searchParams.get("status") || "semua";

    const statusParam: "all" | IFamilyStatus =
      status === "semua"
        ? "all"
        : status === "penghuni-tetap"
        ? "resident"
        : "boarding";

    const LIMIT = 20;
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
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
      ];
    }

    if (statusParam !== "all") {
      query.status = statusParam;
    }

    const skip = (page - 1) * LIMIT;
    const total = await Family.countDocuments(query);
    const totalPages = Math.ceil(total / LIMIT);

    const families = await Family.find(query)
      .sort({ headFamily: 1 })
      .skip(skip)
      .limit(LIMIT);

    return Response.json({
      success: true,
      data: families,
      pagination: {
        page,
        limit: LIMIT,
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
