export interface IUser {
  id?: any;
  name?: string;
  email?: string;
  password?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: '',
  name: '',
  email: '',
  password: ''
};
