import React from "react";
import style from './battery.module.css'

const Battery = (props) => {
    const batteryOuterStyle = {
        height: props.batteryOuterHeight,
        width: props.batteryOuterWidth
    }

    const batteryLevelPercentage = ((props.batteryOuterWidth/100) * props.batteryLevel)
    const batteryLevelWidth = batteryLevelPercentage > props.batteryOuterWidth ? props.batteryOuterWidth : batteryLevelPercentage
    
    const batteryLevelStyle = {
        height:  props.batteryOuterHeight,
        width: batteryLevelWidth,
        backgroundColor: props.batteryLevelColor
    }
    
    let batteryBumpStyle = {}
    if(batteryLevelWidth === props.batteryOuterWidth){
        batteryBumpStyle = {
            backgroundColor: props.batteryLevelColor
        }
    }

    return (
        <div>
            <div className={style.batteryContainer} >
                <div className={style.batteryOuter} style={batteryOuterStyle}>
                    <div className={style.batteryLevel} style={batteryLevelStyle}></div>
                </div>
                <div className={style.batteryBump} style={batteryBumpStyle}></div>
            </div>
        </div>
    );
}

Battery.defaultProps = {
    batteryOuterWidth: 150,
    batteryOuterHeight: 60,
    batteryLevel: 0,
    batteryLevelColor: "#22E3A7"
}


export default Battery;
