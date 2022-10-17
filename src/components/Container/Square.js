import React, { useEffect, useRef } from 'react'

const Square = ({ square, parent }) => {

    const squareRef = useRef(null)
    useEffect(() => {

        let placeHolderWidth = parent.current.children[0].clientWidth;
        let gap = ((parent.current.clientWidth) - (placeHolderWidth*4))/5;
        

        squareRef.current.style.width = `${parent.current.children[0].clientWidth}px`;
        squareRef.current.style.top = `${square.position[0] * squareRef.current.clientHeight + ((square.position[0] + 1) * (gap))}px`;
        squareRef.current.style.left = `${square.position[1] * squareRef.current.clientWidth + ((square.position[1] + 1) * (gap))}px`;


    }, [])

    
    return (
        <div ref={squareRef} className={`absolute aspect-square rounded-md bg-yellow-300 text-white flex-center font-bold text-2xl`}>
            {square.value}
        </div>
    )
}

export default Square