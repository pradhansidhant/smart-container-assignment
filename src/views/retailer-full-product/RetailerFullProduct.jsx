
import React, { useEffect, useState } from 'react';
import Doughnut from '../../components/doughnut/Doughnut';

const RetailerFullProduct = () => {
  const [listOfKegTrackers, setListOfKegTrackers] = useState([])
  useEffect(() => {
    const productNameMap = new Map();
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        if (data && data.kegs && Array.isArray(data.kegs)) {
          const filterKegsData = data.kegs.filter((keg)=>{
                if(keg.location === "Retailer" && keg.volume >=90 && keg.volume <=100 && !productNameMap.has(keg.product))
                {
                  productNameMap.set(keg.product)
                  return true
                }
          });
          setListOfKegTrackers([...filterKegsData])
        }
      })
  }, [])

  return <div>
     {listOfKegTrackers.length > 0 && <Doughnut data={listOfKegTrackers} valueField={"volume"} labelField={"product"}/>}</div>;
};

export default RetailerFullProduct;