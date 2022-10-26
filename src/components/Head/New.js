import React, { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useSelector } from 'react-redux';
import FunctionsContext from '../../context/FunctionsContext';
import ConfirmUI from '../Helpers/ConfirmUI';

export const New = () => {

    const { playGame } = useContext(FunctionsContext)
    const {undo} = useSelector(state => state.settings)

    const options = {
        customUI: ({ onClose, title, message, buttons }) => {
            return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
        },
        title: 'New Game',
        message: 'Are you sure you want to start a new game?',
        buttons: [
            {
                label: 'YES',
                onClick: () => playGame()
            },
            {
                label: 'NO',
                onClick: () => {}
            }
        ],

    };


    return (
        <button onClick={() => confirmAlert(options)} className={`${undo ? 'col-span-1' : 'col-span-2'} bg-red-500 rounded-md flex-center font-bold text-white text-xs py-1 sm:text-sm md:text-lg`}>
            NEW
        </button>
    )
}
