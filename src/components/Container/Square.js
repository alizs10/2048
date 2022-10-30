import React, { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'
import { setSquareColor } from '../../helpers/helpers'

const Square = ({ square }) => {

    const [value, setValue] = useState(square.value)
    const [isMerged, setIsMerged] = useState(false)
    const [scale, setScale] = useState(1)
    
    const squareRef = useRef(null)

    useEffect(() => {
        if (square.value != value) {
            setIsMerged(true)
        }
        setValue(square.value)
    }, [square.value])

    useEffect(() => {

        if (isMerged) {
            setScale(1.2)
            setTimeout(() => {
                setScale(1)
                setIsMerged(false)
            }, 200)
        }

    }, [isMerged])


    useEffect(() => {
        squareRef.current.style.setProperty("--x", square.position[0])
        squareRef.current.style.setProperty("--y", square.position[1])
    }, [square])


    let colorClasses = setSquareColor(square.value);

    return (
        <motion.div
            animate={{ scale }}
            transition={{duration: 0.2}}
            ref={squareRef}
            className={`absolute tile select-none ${colorClasses} flex-center font-bold text-3xl`}>
            {square.value}
        </motion.div>
    )
}

export default Square