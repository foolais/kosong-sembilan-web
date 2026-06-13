import mongoose, { Schema, Document, Types } from "mongoose";

export type IFamilyStatus = "resident" | "boarding";

export interface IFamilyMember {
  _id: Types.ObjectId;
  name: string;
}

export interface IFamilyData {
  _id: Types.ObjectId;
  headFamily: string;
  status: IFamilyStatus;
  members: IFamilyMember[];
}

export interface IFamily extends Document, IFamilyData {}

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
