export interface IUser {
  _id?: any;
  name?: string;
  email?: string;
  password?: string;
}

export const defaultValue: Readonly<IUser> = {
  _id: '',
  name: '',
  email: '',
  password: ''
};
