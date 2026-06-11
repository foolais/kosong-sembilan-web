import mongoose, { Schema, Document } from "mongoose";

export interface IFamily extends Document {
  headFamily: string;
  status: "resident" | "boarding";
  members: {
    name: string;
  }[];
}

const FamilySchema = new Schema<IFamily>(
  {
    headFamily: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["resident", "boarding"],
      required: true,
      default: "resident",
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Family ||
  mongoose.model<IFamily>("Family", FamilySchema);
