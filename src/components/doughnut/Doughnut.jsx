import React, { useEffect, useState } from "react";
import DonutChart from 'react-donut-chart';

const Doughnut = (props)=> {
  const [data, setData] = useState([])
  useEffect(()=>{
      const populateData = props.data.map((dataObject)=>{
            if(dataObject[props.labelField] && dataObject[props.valueField]){
              return {
                label: dataObject[props.labelField],
                value: parseInt(dataObject[props.valueField])
              }
            }
      })
      setData([...populateData])
  },[])
  return (
    <div>
    <DonutChart
      data={data || []}
    />
    </div>
  );
}

Doughnut.defaultProps = {
  valueField: "value",
  labelField: "label",
  data: []
}


export default Doughnut;
