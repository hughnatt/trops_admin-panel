export interface IAdvert {
  _id?: any;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
}

export const defaultValue: Readonly<IAdvert> = {
  _id: '',
  title: '',
  price: 0,
  description: '',
  category: ''
};
