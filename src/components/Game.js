import { AnimatePresence } from 'framer-motion'
import React, { useContext, useEffect } from 'react'
import App from '../App'
import FunctionsContext from '../context/FunctionsContext'
import Menu from './Menu'
import Statistics from './Statistics'

const Game = () => {

    const { menuVisibility, statVisibility } = useContext(FunctionsContext)

    return (
        <div className='relative h-screen w-full overflow-hidden flex-center'>

            <AnimatePresence>
                {!menuVisibility && !statVisibility && (
                    <App />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {menuVisibility && (
                    <Menu />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {statVisibility && (
                    <Statistics />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Game