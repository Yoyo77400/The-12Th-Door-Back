import { Schema } from "mongoose";
import { IUniq } from "../../../models/";

export const UniqSchema = new Schema<IUniq>(
  {
    code_id: { type: String, required: true },
    wallet_address: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "uniqs",
    versionKey: false,
  }
);
