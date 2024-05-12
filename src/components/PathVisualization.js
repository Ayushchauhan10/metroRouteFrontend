import {React,useState} from 'react';

const PathVisualization = ({ station, key,type, color1, color2 }) => {
    const colorMap = {
        yellowColor: '#FDDA0D',
        redColor: '#FF0000',
        pinkColor: '#FFB6C1',
        greenColor: '#008000',
        greenbranchColor: '#008000',
        blueColor: '#0096FF',
        bluebranchColor:'#0096FF',
        greyColor: '#808080',
        orangeColor: '#FF7722',
        magentaColor: '#8b008b',
        violetColor: '#7F00FF',
        interChangeColor: '#ddb892'
    };
    const [showSpan, setShowSpan] = useState(0);

    const getColor = () => {
        if (type === '1' || type === '0') {
            return colorMap[color2];
        } else if (type === '2') {
            return colorMap[color1];
        } else {
            return colorMap['interChangeColor'];
        }
    };
    const getColorName = () => {
        var color;
        if (type === '1' || type === '0') {
            color= color2;
        } else if (type === '2') {
            color= color1;
        } else {
            return 'Inter Change';
        }

        var cleanedName = color.replace("Color", "")+ ' Line';
         cleanedName = cleanedName.replace(/branch(?:ed)?/gi, '').trim();
        return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);

    };

    function capitalizeFirstLetterOfEachWord(str) {
        var name= str.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');

        if(name.length>15)
          name=name.substr(0,15)+"...";

          return name;
    }
    function capitalizeFirstLetterOfEachWord1(str) {
        var name= str.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');

          return name;
    }
    

    return (
        <div className=" min-w-[200px] text-slate-800 w-auto inline-block  border-2 py-2 px-3 text-center items-center justify-center text-[18px] font-medium rounded-2xl overflow-auto" style={{ backgroundColor: getColor() }}>
           <div 
                className='group relative w-auto inline-block bg-white text-center text-sm px-3 py-1 rounded-lg' 
                style={{ color: getColor() }}
                onMouseEnter={() => setShowSpan(true)} // Show span on mouse enter
                onMouseLeave={() => setShowSpan(false)} // Hide span on mouse leave
            >
                {capitalizeFirstLetterOfEachWord(station)}
                <span className={`group absolute ${showSpan ? 'block' : 'hidden'} px-3 text-black rounded-3xl top-[0.05em] right-[0.05em] w-auto text-center bg-slate-300`} >
                    {capitalizeFirstLetterOfEachWord1(station)}
                </span>
            </div>
            <br/>
            <div className='w-auto  inline-block bg-white px-3 py-1 rounded-2xl text-xs' style={{ color: getColor() }}>
                 {getColorName()}
            </div>
            
        </div>
    );
};

export default PathVisualization;
