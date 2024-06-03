import { AdminModel } from './admin.model';

const getAllAdminDB = async () => {
  const results = await AdminModel.find();
  return results;
};
const getSingleAdminDB = async (id: string) => {
  const results = await AdminModel.findOne({ id });
  return results;
};
const updateAdminDB = async (id, payload) => {
  const results = await AdminModel.findOneAndUpdate(id, payload, {
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
