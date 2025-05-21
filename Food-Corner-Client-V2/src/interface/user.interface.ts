interface IUser {
  _id: string;
  id: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface IAdminName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAdmin {
  _id: string;
  id: string;
  user: IUser;
  name: IAdminName;
  email: string;
  gender: string;
  contactNo: string;
  address: string;
  photo: string;
  __v: number;
}
