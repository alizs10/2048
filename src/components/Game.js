import { AnimatePresence } from 'framer-motion'
import React, { useContext, useEffect } from 'react'
import App from '../App'
import FunctionsContext from '../context/FunctionsContext'
import Menu from './Menu'
import CacheProvider from './Providers/CacheProvider'
import Statistics from './Statistics'

const Game = () => {

    const { menuVisibility, statVisibility } = useContext(FunctionsContext)

    return (
        <div className='relative h-screen w-full overflow-hidden flex-center'>

            <AnimatePresence>
                {!menuVisibility && !statVisibility && (
                    <CacheProvider>
                        <App />
                    </CacheProvider>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {menuVisibility && (
                    <CacheProvider>
                        <Menu />
                    </CacheProvider>
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