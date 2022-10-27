import { AnimatePresence } from 'framer-motion'
import React, { useContext, useEffect } from 'react'
import App from '../App'
import FunctionsContext from '../context/FunctionsContext'
import Menu from './Menu'

const Game = () => {

    const { menuVisibility } = useContext(FunctionsContext)

    return (
        <div className='relative h-screen w-full overflow-hidden flex-center'>

            <AnimatePresence>
                {!menuVisibility && (
                    <App />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {menuVisibility && (
                    <Menu />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Game