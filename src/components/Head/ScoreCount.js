import React, { useEffect } from 'react'

import { motion } from 'framer-motion'

const ScoreCount = ({ score, scoreCountArr, setScoreCountArr }) => {

    useEffect(() => {
        return () => {
            let filteredScoreCountArr = scoreCountArr.filter(score => score.id != score.id)
            setScoreCountArr([...filteredScoreCountArr])
        }
    }, [])

    return (
        <motion.div
            initial={{ scale: 1.2 }}
            exit={{ top: "-50px", opacity: 0 }}
            transition={{ bounce: "none", duration: 0.7 }}

            className='absolute top-2 self-center z/10 text-2xl text-stone-700 font-bold'
        >
            +{score.score}
        </motion.div>
    )
}

export default ScoreCount