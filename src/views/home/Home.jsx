import React, { useEffect, useState } from 'react';
import Battery from '../../components/battery/Battery';
import Dropdown from '../../components/dropdown/Dropdown';
import GoogleMap from '../../components/google-map/GoogleMap';
import Temperature from '../../components/temperature/Temperature';
import Volume from '../../components/volume/Volume';
import { getAllKegs } from '../../store/api/KegAPI';
import style from './home.module.css';

const Home = () => {
  const [listOfKegTrackers, setListOfKegTrackers] = useState([])
  const [kegTracker, setKegTracker] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const kegs = await getAllKegs();
      if (kegs) {
        setListOfKegTrackers(kegs);
      } else {
        alert("There is problem to load data.");
      }
    }
    fetchData();
  }, [])

  const handleOnChangeKegTracker = (value) => {
    if (Array.isArray(value) && value.length > 0) {
      setKegTracker(value[0])
    }
  }

  return (
    <div>
      <div className={style.dropdown}>
        <Dropdown
          options={listOfKegTrackers}
          labelField={"kegtrackerId"}
          valueField={"kegtrackerId"}
          onChange={handleOnChangeKegTracker}
          placeholder={"Select KegTracker ID"}
        />
      </div>
      <div className={style.chartContainer}>
        {kegTracker && (
          <div>
            <div className={style.chartWrapperTitle}>
              <div className={style.chartTitle}>
                Temperature (&#8451;)
              </div>
              <div className={style.chartTitle}>
                Volume (%)
              </div>
              <div className={style.chartTitle}>
                Battery (%)
              </div>
            </div>
            <div className={style.chartWrapper}>
              <div className={style.chartContent}>
                <div className={style.temperatureWrapper}>
                <Temperature currentValue={kegTracker.temperature} />
                <div className={style.temperatureContent}>
                  <div className={style.temperatureContentTitle}>
                   {kegTracker.temperature} &#8451;
                  </div>
                  <div className={style.temperatureContentDescription}>
                    Last Updated By {new Date(kegTracker.statusTime).toDateString()}
                  </div>
                </div>
                </div>
              </div>
              <div className={style.chartContent}>
                <Volume volumePercentage={kegTracker.volume}/>
              </div>
              <div className={style.chartContent} >
                <Battery batteryLevel={kegTracker.Battery}/>
                <div className={style.batteryContentTitle}>
                   {kegTracker.Battery}%
                 </div>
              </div>
            </div>
            <div className={style.mapContainer}>
            <GoogleMap latitude={kegTracker.latitude} longitude={kegTracker.longitude}/>
          </div>
          </div>
        )}
      </div>
    </div>);
};

export default Home;