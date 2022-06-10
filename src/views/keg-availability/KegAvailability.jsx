
import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../components/doughnut-chart/DoughnutChart';
import { getAllKegs } from '../../store/api/KegAPI';
import { getRandomColor } from '../../store/utils/ColorUtility';
import style from './keg.availability.module.css'
const KeyAvailability = () => {
  const [locationChartData, setLocationChartData] = useState()
  useEffect(() => {

    const fetchData = async () => {
      const kegs = await getAllKegs();
      if (kegs) {
        parseKegsData(kegs)
      } else {
        alert("There is problem to load data.");
      }
    }
    fetchData()
  }, [])


  const parseKegsData = (kegs) => {
    let locationLabels = []
    let locationMap = new Map();
    let locationIndexCounter = 0;

    kegs.map((keg) => {
      if (!locationMap.has(keg.location)) {
        locationMap.set(keg.location, locationIndexCounter)
        locationIndexCounter++;
        locationLabels.push(keg.location)
      }
    })
    const dataArray = Array(locationLabels.length).fill(0)
    const backgroundColorArray = []
    const borderColorArray = []
    dataArray.map(() => {
      backgroundColorArray.push(getRandomColor())
      borderColorArray.push(getRandomColor())
    })
    kegs.map((keg) => {
      const kegLocationIndex = locationLabels.indexOf(keg.location);
      if (kegLocationIndex >= 0) {
        dataArray[kegLocationIndex] = dataArray[kegLocationIndex] + keg.volume
      }
    })

    const locationChartData = {
      plugins:{
        title: {
          display: true,
          text: 'Product Quantity Across Retailers',
        },
      },
      labels: locationLabels,
      datasets: [
        {
          label: '# of Votes',
          data: dataArray,
          backgroundColor: backgroundColorArray,
          borderColor: borderColorArray,
          borderWidth: 1,
        },
      ],
    }
    setLocationChartData(locationChartData)
  }
  return <div>
    {locationChartData && <div className={style.chartWidth}> <h1>Keg Location Chart</h1><DoughnutChart data={locationChartData} /> </div> }
    </div>;
};

export default KeyAvailability;