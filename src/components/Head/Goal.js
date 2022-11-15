import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'

export const Goal = () => {

    const { goal } = useSelector(state => state.info)
    const { handleToggleMenu } = useContext(FunctionsContext)

    return (
        <div
            onClick={handleToggleMenu}
            className='cursor-pointer w-[40%] xs:w-[30%] h-fit aspect-square flex-center text-white font-bold bg-[#EDC22E] rounded-md text-xl md:text-3xl'>
            {goal}
        </div>
    )
}
