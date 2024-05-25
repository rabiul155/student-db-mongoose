export type UserType = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'student' | 'admin' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};

export type NewUserType = {
  password: string;
  role: string;
  id: string;
};
