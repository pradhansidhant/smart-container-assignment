import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/dropdown/Dropdown';
import Temperature from '../../components/temperature/Temperature';
import style from './home.module.css';

const Home = () => {
  const [kegData, setKegData] = useState([])
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        if (data && data.kegs) {
          setKegData(data.kegs)
        } else {
          alert("There is problem to load data.");
        }
      })
  }, [])

  const renderSelectDropDown = () => {
    return (<Dropdown
      options={kegData}
      labelField={"kegtrackerId"}
      valueField={"kegtrackerId"}
      onChange={(value) => console.log(value)}
      placeholder={"Select KegTracker ID"}
    />)
  }


  return (
    <div>
      <div className={style.dropdown}>
        <Dropdown
          options={kegData}
          labelField={"kegtrackerId"}
          valueField={"kegtrackerId"}
          onChange={(value) => console.log(value)}
          placeholder={"Select KegTracker ID"}
        />
      </div>
      <Temperature />
    </div>);
};

export default Home;