import products from './data-1';
import detail from './data';

export const getListDataProducts = () => {
  return products;
}
export const getDataProductById = (id) => {
  return detail.filter(item => item.id === id)[0];
}