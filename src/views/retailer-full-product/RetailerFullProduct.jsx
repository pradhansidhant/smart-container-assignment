
import React, { useEffect, useState } from 'react';
import Doughnut from '../../components/doughnut/Doughnut';
import { getAllKegs } from '../../store/api/KegAPI';

const RetailerFullProduct = () => {
  const [listOfKegTrackers, setListOfKegTrackers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const productNameMap = new Map();
      const kegs = await getAllKegs();
      if (kegs) {
        const filterKegsData = kegs.filter((keg) => {
          if (keg.location === "Retailer" && keg.volume >= 90 && keg.volume <= 100 && !productNameMap.has(keg.product)) {
            productNameMap.set(keg.product)
            return true
          }
        });
        setListOfKegTrackers(filterKegsData)
      } else {
        alert("There is problem to load data.");
      }
    }
    fetchData();
  }, [])

  return <div>
    {listOfKegTrackers.length > 0 && <Doughnut data={listOfKegTrackers} valueField={"volume"} labelField={"product"} />}</div>;
};

export default RetailerFullProduct;