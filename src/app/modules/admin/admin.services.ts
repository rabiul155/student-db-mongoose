import { AdminType } from './admin.interface';
import { AdminModel } from './admin.model';

const getAllAdminDB = async () => {
  const results = await AdminModel.find();
  return results;
};
const getSingleAdminDB = async (id: string) => {
  const results = await AdminModel.findOne({ id });
  return results;
};
const updateAdminDB = async (id: string, payload: Partial<AdminType>) => {
  const { name, ...others } = payload;
  const modifiedPayload: Record<string, unknown> = {
    ...others,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }

  const results = await AdminModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return results;
};

const deleteAdminDB = async (id: string) => {
  const results = await AdminModel.findOneAndDelete({ id });
  return results;
};

export const adminServices = {
  getAllAdminDB,
  getSingleAdminDB,
  updateAdminDB,
  deleteAdminDB,
};
