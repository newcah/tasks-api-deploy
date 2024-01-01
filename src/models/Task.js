import { Schema, model } from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2";

const taskSchema = new Schema(
  {
    titulo: { type: String, required: true, trim: true },
    contenido: { type: String, trim: true },
    done: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate);
export default model("Task", taskSchema);
