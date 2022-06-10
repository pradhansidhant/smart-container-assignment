import React, { useEffect, useState } from 'react';
import BarChart from '../../components/barchart/Barchart';
import { getAllKegs } from '../../store/api/KegAPI';
import { getRandomColor } from '../../store/utils/ColorUtility';
import style from "./product.module.css"
const ProductAvailability = () => {
  const [listOfRetailChannels, setListOfRetailChannels] = useState([])
  const retailerChannelLabels = ["JWD", "Stonegate", "Three Nations", "Greene King", "MAB", "Punch Taverns", "Brewdog"];

  const [listOfRetailers, setListOfRetailers] = useState([])
  const [retailerLabels, setRetailerLabels] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const kegs = await getAllKegs();
      if (kegs) {
        parseKegsData(kegs)
      } else {
        alert("There is problem to load data.");
      }
    }

    fetchData();
  }, [])


  const getPlaceNameDataPosition = (placeName) => {
    if (placeName) {
      switch (placeName) {
        case "Vixen Pub Co Ltd - The Vale of York":
        case "Brewdog Leicester":
        case "Brewdog Soho":
        case "Brewdog Peterhead":
        case "Brewdog Liverpool":
          return retailerChannelLabels.indexOf("JWD")
        case "Montgomerie Arms":
          return retailerChannelLabels.indexOf("Stonegate")
        case "Whistle Punks UK Ltd":
          return retailerChannelLabels.indexOf("Three Nations")
        case "Mile and a Third Limited":
          return retailerChannelLabels.indexOf("Greene King")
        case "Fest and Revel - The Guinea":
          return retailerChannelLabels.indexOf("MAB")
        case "Temple Bars LTD T/A Four Horsemen":
          return retailerChannelLabels.indexOf("Punch Taverns")
        case "Brewdog Newcastle":
        case "Brewdog Milton Keynes":
        case "Brewdog Leeds":
        case "Brewdog Edinburgh Airport":
        case "Brewdog Camden":
        case "Brewdog Dundee":
          return retailerChannelLabels.indexOf("Brewdog")
      }
    }
    return -1
  }

  const parseKegsData = (kegs) => {
    let retailChannelDataSet = []
    let retailChannelMap = new Map();
    let retailChannelIndexCounter = 0;

    let retailerDataSet = []
    let retailerPlaceMap = new Map();
    let retailerProductMap = new Map();
    let retailerPlaceIndex = 0;
    let retailerProductIndex = 0;
    let retailerPlaceArray = []
    let reatilerData = []
    kegs.map((keg) => {
      if (keg.location === "Retailer") {
        if (!retailerPlaceMap.has(keg.placename)) {
          retailerPlaceMap.set(keg.placename, retailerPlaceIndex)
          retailerPlaceArray.push(keg.placename)
          retailerPlaceIndex++
        }
        reatilerData.push(keg)
      }
      const placePosition = getPlaceNameDataPosition(keg.placename)
      if (placePosition >= 0) {
        if (!retailChannelMap.has(keg.placename)) {
          retailChannelMap.set(keg.placename, retailChannelIndexCounter)
          const dataArray = Array(retailerChannelLabels.length).fill(0)
          retailChannelIndexCounter++
          const index = placePosition;
          dataArray[index] = keg.size
          retailChannelDataSet.push({
            label: keg.placename,
            data: dataArray,
            backgroundColor: getRandomColor(),
          })
        } else {
          const datasetIndex = retailChannelMap.get(keg.placename)
          const index = placePosition;
          retailChannelDataSet[datasetIndex].data[index] = retailChannelDataSet[datasetIndex].data[index] + keg.size
        }
      }
    })

    reatilerData.map((keg) => {
      const placeIndex = retailerPlaceArray.indexOf(keg.placename);
      if (placeIndex >= 0) {
        if (!retailerProductMap.has(keg.product)) {
          retailerProductMap.set(keg.product, retailerProductIndex)
          const dataArray = Array(retailerPlaceArray.length).fill(0)
          retailerProductIndex++
          const index = placeIndex
          dataArray[index] = keg.size
          retailerDataSet.push({
            label: keg.product,
            data: dataArray,
            backgroundColor: getRandomColor(),
          })
        } else {
          const datasetIndex = retailerProductMap.get(keg.product)
          const index = placeIndex;
          retailerDataSet[datasetIndex].data[index] = retailerDataSet[datasetIndex].data[index] + keg.size
        }
      }
    })

    setListOfRetailChannels(retailChannelDataSet)
    setListOfRetailers(retailerDataSet)
    setRetailerLabels(retailerPlaceArray)
  }

  const retailChannelOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Product Quantity Accross Retail channnels (Stacked)',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const retailerOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Product Quantity Across Retailers',
      },
    },
  };


  return <div>
    {listOfRetailChannels.length > 0 && <BarChart options={retailChannelOptions} data={{ labels: retailerChannelLabels, datasets: listOfRetailChannels }} />}
    <div className={style.row} >
      {listOfRetailers.length > 0 && <BarChart options={retailerOptions} data={{ labels: retailerLabels, datasets: listOfRetailers }} />}
    </div>;
  </div>
};


export default ProductAvailability;