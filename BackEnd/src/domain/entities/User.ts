export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "staff" | "client";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
