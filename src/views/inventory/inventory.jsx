import React, { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import style from './inventory.module.css'
const Inventory = () => {
  const typeColor = {
    "India Pale Ale": "#f68ae9",
    "Pale Ale": "#c440e8",
    "Stout": "#008af2",
    "Red Ale": "#ff6969",
    "Sour": "#5fefa4",
    "Session Pale Ale": "#fb8d34",
    "Lager": "#f2b800"
  }
  const columns = [
    {
      name: 'Type Color',
      id: "type",
      cell: (row) => {
        let bgColor = ""
        if(typeColor[row?.type]){
          bgColor = typeColor[row.type]
        }
        return (<div className={style.typeBgColor} style={{ backgroundColor: bgColor }}> </div>)
      },
      width: "120px",
      style:{
        justifyContent: "center"
      }
    },
    {
      name: 'BatchID',
      selector: row => row.batchNumber,
      sortable: true,
      width: "90px",
      style:{
        justifyContent: "center"
      }
    },
    {
      name: 'Current location',
      selector: row => row.placename,
      sortable: true
    },
    {
      name: 'Product',
      selector: row => row.product,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true
    }
  ];
  const [listOfKegTrackers, setListOfKegTrackers] = useState([])
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        if (data && data.kegs) {
          try {
            const addStatusToList = data.kegs.map((keg) => {
              if (keg.volume >= 91 && keg.volume <= 100) {
                keg.status = "Full"
              } else if (keg.volume >= 11 && keg.volume <= 90) {
                keg.status = "In Use"
              } else if (keg.volume >= 0 && keg.volume <= 10) {
                keg.status = "Empty"
              }
              return keg
            });
            setListOfKegTrackers([...addStatusToList])
          } catch (err) {
            console.log(err)
          }
        } else {
          alert("There is problem to load data.");
        }
      })
  }, [])

  const renderProductTypeWithColor = ()=>{
    var productColorOptions = Object.keys(typeColor).map(function(key) {
      let bgColor = ""
        if(typeColor[key]){
          bgColor = typeColor[key]
        }
      return (
        <div key={key} className={style.typeWrapper}>
          <div  className={style.typeBgColor} style={{ backgroundColor: bgColor }}></div>
          {key}
        </div>
      )
  });
    return (<div className={style.typeContainer}>{productColorOptions}</div>)
  }
  return <div>
    {listOfKegTrackers.length > 0 && (
      <>
      {renderProductTypeWithColor()}
      <Table data={listOfKegTrackers} columns={columns} />
      </>
    )
    }</div>;
};

export default Inventory;