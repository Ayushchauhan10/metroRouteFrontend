import React from 'react';

const PathVisualization = ({ station, key,type, color1, color2 }) => {
    const colorMap = {
        yellowColor: '#FDDA0D',
        redColor: '#FF0000',
        pinkColor: '#FFB6C1',
        greenColor: '#008000',
        blueColor: '#0096FF',
        greyColor: '#808080',
        orangeColor: '#FF7722',
        magentaColor: '#8b008b',
        violetColor: '#7F00FF',
        interChangeColor: '#ddb892'
    };

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

        return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);

    };

    function capitalizeFirstLetterOfEachWord(str) {
        return str.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
    
    return (
        <div className=" min-w-[200px] text-slate-800 w-auto inline-block h-auto border-2 py-4 px-3 text-center items-center justify-center text-[18px] font-medium rounded-full overflow-auto" style={{ backgroundColor: getColor() }}>
            <div className='w-auto inline-block text-center' >
                {capitalizeFirstLetterOfEachWord(station)}
            </div>
            <br/>
            <div className='w-auto text-sm inline-block'>
                 {getColorName()}
            </div>
            
        </div>
    );
};

export default PathVisualization;
