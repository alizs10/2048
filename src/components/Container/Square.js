import React, { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'
import { setSquareColor } from '../../helpers/helpers'

const Square = ({ square, parent }) => {

    const [x, setX] = useState("")
    const [y, setY] = useState("")
    const [value, setValue] = useState(square.value)
    const [isMerged, setIsMerged] = useState(false)
    const [shouldMove, setShouldMove] = useState(false)

    const squareRef = useRef(null)

    useEffect(() => {
        if (square.value != value) {
            setIsMerged(true)
        }
        setValue(square.value)
    }, [square.value])

    useEffect(() => {

        if (isMerged) {
            setScale(1.1)
            setTimeout(() => {
                setScale(1)
                setIsMerged(false)
            }, 200)
        }

    }, [isMerged])


    useEffect(() => {

        let placeHolderWidth = parent.current.children[0].clientWidth;
        let gap = ((parent.current.clientWidth) - (placeHolderWidth * 4)) / 5;


        squareRef.current.style.width = `${parent.current.children[0].clientWidth}px`;
        squareRef.current.style.top = `${square.position[1] * squareRef.current.clientHeight + ((square.position[1] + 1) * (gap))}px`;
        squareRef.current.style.left = `${square.position[0] * squareRef.current.clientWidth + ((square.position[0] + 1) * (gap))}px`;

    }, [square])

    useEffect(() => {
        setScale(1)
    }, [])

    const [scale, setScale] = useState(0)
    let colorClasses = setSquareColor(square.value);


    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale }}
            transition={{ bounce: "none", duration: 0.1 }}
            ref={squareRef}

            className={`transition-all duration-200 select-none absolute aspect-square rounded-md ${colorClasses} flex-center font-bold text-3xl`}>
            {square.value}
        </motion.div>
    )
}

export default Square