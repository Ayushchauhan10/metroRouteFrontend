import React, { useState,useEffect,useRef } from 'react';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import PathVisualization from './PathVisualization';
import { IoArrowDownOutline } from "react-icons/io5";
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import { IoMdArrowRoundForward } from "react-icons/io";


function RouteFinder() {
    const [path, setPath] = useState([]);
    const [interChanges, setinterChanges] = useState([]);
    const [totalTime, settotalTime] = useState(0);
    const [recommendations1, setRecommendations1] = useState([]);
    const [recommendations2, setRecommendations2] = useState([]);
    const [showSuggestions2, setShowSuggestions2] = useState(false);
    const [showSuggestions1, setShowSuggestions1] = useState(false);
    const suggestionsRef2 = useRef(null);
    const suggestionsRef1 = useRef(null);

    const [text] = useTypewriter({
        words: ["Delhi Metro Route Finder ...","Delhi Metro Map ..."],
        loop: true,
        typeSpeed: 20,
        deleteSpeed: 10,
        delaySpeed: 2000,
      });

     const [formData, setFormData] = useState({
        startStation: '',
        endStation: ''
      });
    
      const handleSubmit = async (event) => {
        event.preventDefault(); 
        formData.startStation =formData?.startStation?.trim().toLowerCase();
        formData.endStation = formData?.endStation?.trim().toLowerCase();
        
        
        if(!formData?.startStation || !formData?.endStation)
        {
            return;
        }


        // const response = await fetch('http://localhost:8000/api/v1/', {
        const response = await fetch('https://metroroutebackend.onrender.com/api/v1/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
         
            const data = await response.json();
            setPath(data.finalPath);
            settotalTime(data.totalTime);
            setinterChanges(data.interChanges);
      };
     
      const handleDivClick2 = (value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            endStation: value
        }));

        setShowSuggestions2(0);
    };

      const handleDivClick1 = (value) => {
        // console.log(value)
        setFormData(prevFormData => ({
            ...prevFormData,
            startStation: value
        }));
        setShowSuggestions1(0);
    };

      useEffect(() => {
        const handleOutsideClick2 = (event) => {
            if (suggestionsRef2.current && !suggestionsRef2.current.contains(event.target)) {
                setShowSuggestions2(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick2);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick2);
        };
    }, [recommendations2]);

      useEffect(() => {
     
        const handleOutsideClick1 = (event) => {
            if (suggestionsRef1.current && !suggestionsRef1.current.contains(event.target)) {
                setShowSuggestions1(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick1);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick1);
        };
    }, [recommendations1]);
    
      const handleChange = async (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        
        if(name==='startStation'){
            try {
            const lowerCaseValue=value.trim().toLowerCase();
                if(lowerCaseValue===''){
                    setRecommendations1([]);
                    return;
                }
                // const response = await fetch('http://localhost:8000/api/v1/recommend1', {
                const response = await fetch('https://metroroutebackend.onrender.com/api/v1/recommend1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "stationName":lowerCaseValue
                    })
                });
                const data = await response.json();
                // console.log(data);
                setRecommendations1(data.recommendations1);

            } catch (error) {
                console.error('Error calling API:', error);
            }
        }
        else{

            try {
                const lowerCaseValue=value.trim().toLowerCase();
                    if(lowerCaseValue===''){
                    setRecommendations2([]);
                    return;
                    }
                    // const response = await fetch('http://localhost:8000/api/v1/recommend2', {
                    const response = await fetch('https://metroroutebackend.onrender.com/api/v1/recommend2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                        "stationName":lowerCaseValue
                        })
                    });
                    const data = await response.json();
                    // console.log("recommendations2",data.recommendations2);
                    setRecommendations2(data.recommendations2);
    
    
                } catch (error) {
                    console.error('Error calling API:', error);
                }

        }
      };
      
    return (
        <div className='w-full flex flex-col gap-10 items-center justify-center '>
         
        <div className='w-full flex flex-col items-center justify-center gap-2'>
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='text-[1.3rem] font-bold text-blue-600 '>Welcome!!! </div>
              <div className='text-red-500 font-bold text-[25px]'>
                <span >{text}  </span>
                <Cursor cursorBlinking="false" cursorStyle="|" cursorColor='#0000FF'/>
               </div>
            
            </div>

            <form onSubmit={handleSubmit} className=' flex bg-blue-600 flex-col items-center justify-center md:w-[70%] w-[95%] cursor-pointer rounded-3xl md:py-3 py-2'>
                <div className='flex flex-row items-center justify-center p-4 py-5 gap-3 md:w-[70%]'>
                  
                    <div className='flex flex-col items-center justify-center gap-2  animate-pulse'>
                        <FaRegCircle className='text-[15px] text-white'/>
                        
                        <div className='flex flex-col gap-1 items-start justify-start'>
                            <div className='w-[6px] h-[6px] rounded-full bg-slate-300'></div>
                            <div className='w-[6px] h-[6px] rounded-full bg-slate-300'></div>
                            <div className='w-[6px] h-[6px] rounded-full bg-slate-300'></div>
                        </div>
                        <MdOutlineLocationOn  className='text-[25px] text-white font-bold'/>
                    </div>
                   
                   <div className=' w-full relative flex flex-col items-center justify-center gap-5 text-blue-600'>

                    <div className='w-[100%]'>
                      
                            <input type="search" 
                                    name="startStation" value={formData.startStation || ''} 
                                    onFocus={() => setShowSuggestions1(true)}
                                    onChange={handleChange} placeholder="Enter Start Station"
                                    autoComplete="off"
                                    className='p-2 px-4 rounded-2xl font-medium w-[100%] cursor-pointer outline:none'
                            />

                            {showSuggestions1 && formData.startStation && recommendations1.length>0 && (
                                <div 
                                    ref={suggestionsRef1}
                                    className='w-[100%] top-10 py-1 px-4 backdrop-blur-md bg-white/45 absolute rounded-lg'>
                                    {recommendations1.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => handleDivClick1(item)}
                                            className={`border-${index === 0 ? '' : 't-2'} py-2 text-blue-600 border-blue-500 border-dashed left-4 mt-1 z-100`}
                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}

                            

                    </div> 


           

                <div className='w-[100%]'>
                            <input 
                                autoComplete="off"
                                type="search" 
                                name="endStation" 
                                value={formData.endStation || ''} 
                                onChange={handleChange} 
                                placeholder="Enter endStation"
                                className='p-2 px-4 rounded-2xl font-medium w-[100%] cursor-pointer'
                                onFocus={() => setShowSuggestions2(true)} 
                            />

{showSuggestions2 && formData.endStation && recommendations2.length>0 && (
                                <div 
                                    ref={suggestionsRef2}
                                    className='w-[100%] top-30 py-1 px-4 backdrop-blur-md bg-white/45 absolute rounded-lg'
                                >
                                    {recommendations2.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => handleDivClick2(item)}
                                            className={`border-${index === 0 ? '' : 't-2'} py-2 text-blue-600 border-blue-500 border-dashed left-4 mt-1 z-100`}
                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}
                </div>

                   

                   </div>

                </div>
                

                <button type="submit" className='bg-white text-blue-600 px-4 py-2 font-extrabold rounded-full hover:bg-slate-200'>Find Route</button>
            </form>

        </div>    


        <div className='w-full flex flex-col justify-center items-center gap-6'>
            <div className='flex flex-row md:gap-10 gap-5 items-start justify-center w-full font-mono  tracking-tighter font-bold '>
                    <div className='text-[20px] flex flex-col items-center justify-center text-sm'>
                        <div className='text-red-600 text-sm text-center'>
                            Total time:
                        </div>
                        <div className='text-blue-600 text-center text-sm'>
                           {totalTime>0 && Math.ceil(totalTime)+' mins'}  
                        </div>
                    </div>

                    <div className='text-[20px] flex flex-col items-center justify-center text-sm'>
                    <span className='text-red-600 text-sm text-center'>
                    Number of Stations: 
                    </span>
                    <span className='text-blue-600 text-center'>
                        {path?.length>0 && path?.length } 
                    </span>
                    
                    </div>

                    <div className='text-[20px] flex flex-col items-center justify-center text-sm'>
                        <span className='text-red-600 text-sm text-center'>

                        InterChanges:  
                        </span>
                    <div className='text-blue-600 flex md:flex-row flex-col text-center'>

                    {interChanges?.map((item, index) => 
                         <div key={index}>
                             
                             {item.charAt(0).toUpperCase() + item.slice(1) +"; "}
                         </div>

                    )}
                    </div>
                    </div>

            </div>

       {path?.length>0 ? 
        <div className='flex flex-col items-start justify-center  md:w-[70%] w-[95%] gap-3 '>
            <div className='font-bold text-[20px] text-blue-600'>
                Your Route:
            </div>
            <div className='flex mb-20 md:mb-0 md:flex-row flex-col h-[600px] md:h-auto overflow-y-auto  md:overflow-x-auto md:w-[70vw] w-[100%] gap-4 items-center  '>
                {path?.map((item, index) => (

                    <div key={index}>
                    { 
                        item.color1===null ?<div className='flex  flex-col md:flex-row items-center justify-center gap-2'> <PathVisualization  station={item.station} type='0' color1={item.color1} color2={item.color2}/> <IoMdArrowRoundForward className='text-[30px]  hidden md:block'/> <IoArrowDownOutline className='text-[30px]  block md:hidden'/></div>:
                        item.color2===null ?<PathVisualization  station={item.station} type='2' color1={item.color1} color2={item.color2}/>:
                        item.color1!==item.color2 ? <div className='flex  flex-col md:flex-row items-center justify-center gap-2'><PathVisualization  station={item.station} type='3' color1={item.color1} color2={item.color2}/> <IoMdArrowRoundForward className='text-[30px] hidden md:block'/><IoArrowDownOutline className='text-[30px]  block md:hidden'/> </div>:
                        <div className='flex flex-col md:flex-row items-center justify-center gap-2'>   <PathVisualization station={item.station}  type='1' color1={item.color1} color2={item.color2}/> <IoMdArrowRoundForward className='text-[30px]  hidden md:block '/> <IoArrowDownOutline className='text-[30px]  block md:hidden'/></div>
                    }

                    </div>
                ))}
            </div>
        </div>
        : 
        <div className='w-[400px] text-center text-blue-600'>
                   No Routes Found.
                   <br/>
                   Please Re-Enter the correct station names.
                </div>
       
        }
         

         
        
        </div>   

        </div>
    );
}

export default RouteFinder;





         /* <div className='w-[100%] '
              >
                        <input type="search" 
                                name="endStation" value={formData.endStation || ''} 
                                onFocus={() => {
                                    setfocus2('1');
            
                                }}
                                onBlur={() => {
                                    setfocus2('0'); 
                                }}
                                onChange={handleChange} placeholder="Enter endStation"
                                className='p-2 px-4 rounded-2xl font-medium w-[100%] cursor-pointer '
                        />
                         {recommendations2?.length>0 && focus2!=='0' && <div className='w-[100%] top-30 py-1 px-4 backdrop-blur-md bg-white/45 absolute rounded-lg'>
                                 {recommendations2?.map((item, index) => 
                                    <div key={index} 
                                    onClick={() => handleDivClick(item)}
                                         className={`border-${index === 0 ? '' : 't-2'} py-2 text-blue-600 border-blue-500 border-dashed left-4  mt-1 z-100`}>
                                        {item.charAt(0).toUpperCase() + item.slice(1) }
                                    </div>
                                    
                                  )}
                            </div>}
                    </div> */