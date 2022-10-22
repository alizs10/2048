import React from 'react'

function ConfirmUI({ title, message, buttons, handleClose }) {

    const handleCancel = () => {
        buttons[1].onClick()
        handleClose()
    }
    
    const handleConfirm = () => {
        buttons[0].onClick()
        handleClose()
    }


    return (
        <div className='mx-auto w-4/5 bg-white border-2 border-gray-200 shadow-md flex flex-col gap-y-2 p-5'>
            <span className='text-2xl font-bold text-gray-800'>{title}</span>
            <span className='mt-2 text-lg text-gray-600'>{message}</span>

            <div className="mt-4 flex justify-between">
                <button onClick={handleCancel} className="px-5 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                    <span>{buttons[1].label}</span>
                </button>
                <button onClick={handleConfirm} className="px-5 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-sm text-gray-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300">
                    <span>{buttons[0].label}</span>
                </button>
            </div>
        </div>
    )
}

export default ConfirmUI