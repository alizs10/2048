import React from 'react'

import { motion } from 'framer-motion'

const ScoreCount = ({ score }) => {
    return (
        <motion.div
            initial={{scale: 1.2}}
            exit={{ top: "-50px", opacity: 0 }}
            transition={{ bounce: "none", duration: 1 }}
            
            className='absolute top-2 self-center z/10 text-2xl text-stone-700 font-bold'
        >
            +{score}
        </motion.div>
    )
}

export default ScoreCount