export const USER_ROLE = {
  student: 'student',
  admin: 'admin',
  faculty: 'faculty',
};

export type RoleType = keyof typeof USER_ROLE;
