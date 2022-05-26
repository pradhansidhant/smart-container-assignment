import React from 'react';
import Thermometer from 'react-thermometer-chart'

const Temperature = (props) => {
    return (
        <Thermometer
         width={props.width}
         height={props.height} 
         steps={props.steps} 
         minValue={props.minValue} 
         maxValue={props.maxValue} 
         color={props.color}
         currentValue={props.currentValue}>
        </Thermometer>
    );
};

Temperature.defaultProps = {
    color: "blue",
    minValue: 0,
    maxValue: 100,
    currentValue: 0,
    steps: 5,
    width: "100px",
    height: "200px"
  }

export default Temperature;