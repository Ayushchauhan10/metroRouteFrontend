import React from 'react';
import metroMap from '../images/metroMap.png';

export const Map = () => {
  return (
    <div className='md:p-[50px] p-[20px] '>
      <img src={metroMap} alt="Metro Map" className='md:w-[100rem] md:h-[80rem]' />
    </div>
  );
};
