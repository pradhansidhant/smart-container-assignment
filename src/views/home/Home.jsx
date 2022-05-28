import React, { useEffect, useState } from 'react';
import Battery from '../../components/battery/Battery';
import Dropdown from '../../components/dropdown/Dropdown';
import GoogleMap from '../../components/google-map/GoogleMap';
import Temperature from '../../components/temperature/Temperature';
import style from './home.module.css';

const Home = () => {
  const [listOfKegTrackers, setListOfKegTrackers] = useState([])
  const [kegTracker, setKegTracker] = useState(null)
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        if (data && data.kegs) {
          setListOfKegTrackers(data.kegs)
        } else {
          alert("There is problem to load data.");
        }
      })
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
                <Temperature currentValue={parseInt(kegTracker.temperature)} />
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
                Test
              </div>
              <div className={style.chartContent} >
                <Battery batteryLevel={parseInt(kegTracker.Battery)}/>
                <div className={style.batteryContentTitle}>
                   {kegTracker.Battery}%
                 </div>
              </div>
            </div>
            <GoogleMap />
          </div>
        )}
      </div>
    </div>);
};

export default Home;