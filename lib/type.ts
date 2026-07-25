export type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

// export type TRegisterResponse = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     id: string;
//     name: string;
//     email: string;
//     activeStatus: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
//     role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
//     createdAt: string;
//     updatedAt: string;
//     profile: {
//       profilePhoto: string | null;
//       bio: string | null;
//     };
//   };
// };
export type RegisterResponse = {
  user: IUser;
} | null;
export type NavbarProps = {
  user: IUser;
};
