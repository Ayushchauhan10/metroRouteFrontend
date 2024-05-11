import React from 'react'

const StationComponent = ({stationName}) => {
  return (
    <div className=' border-2 border-black w-[200px] p-2 text-center'
    >{stationName}</div>
  )
}

export default StationComponent