// component
import SvgColor from '../../../Components/User/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Product',
    path: 'products',
    icon: icon('ic_product'),
  },
  {
    title: 'Cart',
    path: 'cart',
    icon: icon('ic_cart'),
  },
  {
    title: 'Order',
    path: 'order',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
