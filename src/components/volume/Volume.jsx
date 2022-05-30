import React from 'react';
import style from './volume.module.css'

const Volume = ({volumePercentage}) => {
    return (
        <div className={style.circle}>
        <div className={style.txt}>{volumePercentage + " %"}</div>
        <div className={style.fill} style={{height: volumePercentage+"%"}}></div>
      </div>
    );
};

Volume.defaultProps = {
   volumePercentage: 0
  }

export default Volume;