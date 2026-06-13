import { connectDB } from "@/lib/mongodb";
import Family from "@/models/Family";

export async function GET() {
  try {
    await connectDB();

    const result = await Family.aggregate([
      {
        $group: {
          _id: null,
          totalFamilies: { $sum: 1 },
          totalMembers: {
            $sum: {
              $size: "$members",
            },
          },
          totalResident: {
            $sum: {
              $cond: [
                { $eq: ["$status", "resident"] },
                { $add: [1, { $size: "$members" }] },
                0,
              ],
            },
          },
          totalBoarding: {
            $sum: {
              $cond: [
                { $eq: ["$status", "boarding"] },
                { $add: [1, { $size: "$members" }] },
                0,
              ],
            },
          },
        },
      },
    ]);

    const totalFamilies = result[0]?.totalFamilies || 0;
    const totalMembers = result[0]?.totalMembers || 0;

    const totalPeople = totalFamilies + totalMembers;
    const totalResident = result[0]?.totalResident || 0;
    const totalBoarding = result[0]?.totalBoarding || 0;

    return Response.json({
      success: true,
      data: {
        totalPeople,
        totalResident,
        totalBoarding,
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
