import React, { useEffect, useRef } from 'react'

const Square = ({ square, parent }) => {

    const squareRef = useRef(null)
    useEffect(() => {

        let placeHolderWidth = parent.current.children[0].clientWidth;
        let gap = ((parent.current.clientWidth) - (placeHolderWidth*4))/5;
        

        squareRef.current.style.width = `${parent.current.children[0].clientWidth}px`;
        squareRef.current.style.top = `${square.position[1] * squareRef.current.clientHeight + ((square.position[1] + 1) * (gap))}px`;
        squareRef.current.style.left = `${square.position[0] * squareRef.current.clientWidth + ((square.position[0] + 1) * (gap))}px`;


    }, [square])

    let classColors = 'bg-gray-200 text-gray-600';
    let exponent = Math.log2(square.value)
    switch (exponent) {
        case 2:
            classColors = 'bg-yellow-50 text-gray-600'
            break;
    
        case 3:
            classColors = 'bg-orange-300 text-white'
            break;
        case 4:
            classColors = 'bg-orange-600 text-white'
            break;
    
        case 5:
            classColors = 'bg-red-400 text-white'
            break;
        case 6:
            classColors = 'bg-red-500 text-white'
            break;
        case 7:
            classColors = 'bg-yellow-200 text-white'
            break;
        case 7:
            classColors = 'bg-yellow-300 text-white'
            break;
        case 8:
            classColors = 'bg-yellow-400 text-white'
            break;
        case 9:
            classColors = 'bg-yellow-500 text-white'
            break;
    
        case 10:
            classColors = 'bg-yellow-600 text-white'
            break;
    
        case 11:
            classColors = 'bg-yellow-700 text-white'
            break;
    
        default:
            break;
    }
    
    return (
        <div ref={squareRef} className={`transition-all duration-300 absolute aspect-square rounded-md ${classColors} flex-center font-bold text-4xl`}>
            {square.value}
        </div>
    )
}

export default Square