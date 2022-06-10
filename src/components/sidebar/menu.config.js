import {
    FolderOpenIcon,
    HomeIcon,
    IdentificationIcon,
  } from '@heroicons/react/outline';
import { NAVIGATION_INVENTORY_PATH, NAVIGATION_KEG_AVAILABILITY_PATH, NAVIGATION_PRODUCT_AVAILABILITY, NAVIGATION_RETAILER_FULL_PRODUCT_PATH } from '../../store/constant/NavigationConstant';
  
  export const sideMenu = [
    {
      label: 'Home',
      Icon: HomeIcon,
      to: "",
    },
    {
      label: 'Inventory',
      Icon: FolderOpenIcon,
      to: NAVIGATION_INVENTORY_PATH,
    },
    {
      label: 'Retailer Full Product',
      Icon: IdentificationIcon,
      to: NAVIGATION_RETAILER_FULL_PRODUCT_PATH,
    },
    {
      label: 'Keg Availability',
      Icon: IdentificationIcon,
      to: NAVIGATION_KEG_AVAILABILITY_PATH,
    },
    {
      label: 'Product Availability',
      Icon: IdentificationIcon,
      to: NAVIGATION_PRODUCT_AVAILABILITY,
    },
  ];