import { Task } from "./model";
import { Model } from "mongoose";

type serviceReturnType = { status: boolean; message: string; data: any };

export const createItem = async (
  model: Model<any>,
  data: any,
  type: string = "Project"
): Promise<serviceReturnType> => {
  try {
    const item = await model.create(data);
    return { status: true, message: type + " Created", data: item };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};

export const fetchItems = async (
  model: Model<any>,
  type: string = "Project",
  condition: any = {}
): Promise<serviceReturnType> => {
  try {
    const items = await model.find(condition);
    return { status: true, message: type + "s", data: items };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};

export const fetchItem = async (
  model: Model<any>,
  id: string,
  type: string = "Project"
): Promise<serviceReturnType> => {
  try {
    let item = await model.findById(id);
    if (!item) throw new Error(`${type} not found`);
    if (type === "Project") {
      item = await Task.find({ project: id });
    }
    return { status: true, message: type, data: item };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};

export const editItem = async (
  model: Model<any>,
  id: string,
  data: any,
  type: string = "Project"
): Promise<serviceReturnType> => {
  try {
    const item = await model.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!item) throw new Error(`${type} does not exist`);
    return { status: true, message: `${type} edited`, data: item };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};

export const deleteItem = async (
  model: Model<any>,
  id: string,
  type: string = "Project"
): Promise<serviceReturnType> => {
  try {
    const item = await model.findByIdAndDelete(id);
    if (type == "Project") {
      await Task.deleteMany({ project: id });
    }
    return { status: true, message: `${type} deleted`, data: item };
  } catch (error: any) {
    return { status: false, message: error.message, data: error };
  }
};
