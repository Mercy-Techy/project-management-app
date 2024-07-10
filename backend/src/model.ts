import { model, Schema, Document } from "mongoose";

export interface ProjectType {
  name: string;
  startDate?: Date;
  endDate?: Date;
}

const ProjectSchema = new Schema({
  name: { type: String, unique: true, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Project = model<ProjectType>("Project", ProjectSchema);

export interface TaskType {
  name: string;
  status: "not-completed" | "in-progress" | "completed";
  deadLine?: Date;
  project: string;
}

const TaskSchema = new Schema({
  name: { type: String, unique: true, required: true },
  status: {
    type: String,
    required: true,
    enum: ["not-completed", "in-progress", "completed"],
    default: "not-completed",
  },
  deadLine: { type: Date, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

export const Task = model<TaskType>("Task", TaskSchema);
