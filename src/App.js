import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Home from './views/home/Home.jsx';
import { NAVIGATION_INVENTORY_PATH, NAVIGATION_KEG_AVAILABILITY_PATH, NAVIGATION_PRODUCT_AVAILABILITY, NAVIGATION_RETAILER_FULL_PRODUCT_PATH } from './store/constant/NavigationConstant';
import Inventory from './views/inventory/Inventory.jsx';
import RetailerFullProduct from './views/retailer-full-product/RetailerFullProduct.jsx';
import KeyAvailability from './views/keg-availability/KegAvailability.jsx';
import ProductAvailability from './views/product-availability/ProductAvailability.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element ={<Home />}>
            </Route>
            <Route path={NAVIGATION_INVENTORY_PATH} element ={<Inventory />}>
            </Route>
            <Route path={NAVIGATION_RETAILER_FULL_PRODUCT_PATH} element ={<RetailerFullProduct />}>
            </Route>
            <Route path={NAVIGATION_KEG_AVAILABILITY_PATH} element ={<KeyAvailability />}>
            </Route>
            <Route path={NAVIGATION_PRODUCT_AVAILABILITY} element ={<ProductAvailability />}>
            </Route>
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
