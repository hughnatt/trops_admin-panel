export interface ICategory {
  id?: string;
  name?: string;
  parent?: string;
}

export const defaultValue: Readonly<ICategory> = {
  id: '',
  name: '',
  parent: ''
};
