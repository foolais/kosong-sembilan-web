import { connectDB } from "@/lib/mongodb";
import Family from "@/models/Family";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const family = await Family.findById(id);

    if (!family) {
      return Response.json(
        {
          success: false,
          message: "Data keluarga tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Data keluarga ditemukan",
      data: family,
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const family = await Family.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!family) {
      return Response.json(
        {
          success: false,
          message: "Data keluarga tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: family,
      message: "Data keluarga berhasil diperbarui",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const family = await Family.findByIdAndDelete(id);

    if (!family) {
      return Response.json(
        {
          success: false,
          message: "Data keluarga tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Data keluarga berhasil dihapus",
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
