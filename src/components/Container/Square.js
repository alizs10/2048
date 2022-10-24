import React, { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

const Square = ({ square, parent }) => {

    const [x, setX] = useState("")
    const [y, setY] = useState("")
    const [value, setValue] = useState(square.value)

    const squareRef = useRef(null)

    useEffect(() => {

        setValue(square.value)

    }, [square.value])
    useEffect(() => {

        let placeHolderWidth = parent.current.children[0].clientWidth;
        let gap = ((parent.current.clientWidth) - (placeHolderWidth * 4)) / 5;


        squareRef.current.style.width = `${parent.current.children[0].clientWidth}px`;
        squareRef.current.style.top = `${square.position[1] * squareRef.current.clientHeight + ((square.position[1] + 1) * (gap))}px`;
        squareRef.current.style.left = `${square.position[0] * squareRef.current.clientWidth + ((square.position[0] + 1) * (gap))}px`;

        setX(square.position[0] * squareRef.current.clientWidth + ((square.position[0]) * (gap)))
        setY(square.position[1] * squareRef.current.clientHeight + ((square.position[1]) * (gap)))

    }, [])

    useEffect(() => {

        let placeHolderWidth = parent.current.children[0].clientWidth;
        let gap = ((parent.current.clientWidth) - (placeHolderWidth * 4)) / 5;


        squareRef.current.style.width = `${parent.current.children[0].clientWidth}px`;
        // squareRef.current.style.top = `${square.position[1] * squareRef.current.clientHeight + ((square.position[1] + 1) * (gap))}px`;
        // squareRef.current.style.left = `${square.position[0] * squareRef.current.clientWidth + ((square.position[0] + 1) * (gap))}px`;

        setX(square.position[0] * squareRef.current.clientWidth + ((square.position[0] + 1) * (gap)))
        setY(square.position[1] * squareRef.current.clientHeight + ((square.position[1] + 1) * (gap)))

    }, [square])


    let classColors = '';
    let exponent = Math.log2(square.value)
    switch (exponent) {
        case 1: // 4
            classColors = 'bg-stone-100 text-gray-600'
            break;

        case 2: // 4
            classColors = 'bg-[#faf4ea] text-gray-600'
            break;

        case 3: // 8
            classColors = 'bg-[#F9C48B] text-white'
            break;
        case 4: // 16
            classColors = 'bg-[#f7a072] text-white'
            break;

        case 5: // 32
            classColors = 'bg-[#fe4a49]/70 text-white'
            break;
        case 6: // 64
            classColors = 'bg-[#fe4a49]/90 text-white'
            break;
        case 7: // 128
            classColors = 'bg-[#FAE588] text-white'
            break;
        case 7: // 256
            classColors = 'bg-[#FAE275] text-white'
            break;
        case 8: // 512
            classColors = 'bg-[#FAE275] text-white'
            break;
        case 9: // 1024
            classColors = 'bg-[#f9dc5c] text-white'
            break;

        case 10: // 2048
            classColors = 'bg-yellow-300 text-white'
            break;

        case 11: // 4096
            classColors = 'bg-stone-700 text-white'
            break;

        default:
            classColors = 'bg-stone-700 text-white'
            break;
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={square.value != value ? { scale: 1.3 } : { scale: 1, top: `${y}px`, left: `${x}px` }}
            transition={{ bounce: "none", duration: 0.2 }}
            ref={squareRef}

            className={`select-none absolute aspect-square rounded-md ${classColors} flex-center font-bold text-3xl`}>
            {square.value}
        </motion.div>
    )
}

export default Square