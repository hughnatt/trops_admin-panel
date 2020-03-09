export interface ICategory {
  _id?: string;
  name?: string;
  parent: string;
  thumbnail?: string;
  description?: string;
}

export const defaultValue: Readonly<ICategory> = {
  _id: '',
  name: '',
  parent: '',
  thumbnail: '',
  description: ''
};
