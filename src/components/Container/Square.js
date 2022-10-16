import React from 'react'

export const Square = ({ square }) => {

    let exponent = Math.log2(square.number)
    let classColor = "bg-stone-500"
    switch (exponent) {
        case 1:
            classColor = "bg-stone-500"
            break;
        case 2:
            classColor = "bg-red-300"
            break;
        case 3:
            classColor = "bg-yellow-300"
            break;
        case 4:
            classColor = "bg-orange-400"
            break;
        case 5:
            classColor = "bg-red-400"
            break;
        case 6:
            classColor = "bg-yellow-600"
            break;
        case 7:
            classColor = "bg-yellow-700"
            break;
        case 8:
            classColor = "bg-yellow-800"
            break;
        case 9:
            classColor = "bg-yellow-800"
            break;
        case 10:
            classColor = "bg-yellow-800"
            break;
        case 11:
            classColor = "bg-yellow-500"
            break;
    
        case 12:
            classColor = "bg-gray-900"
            break;
    
        case 12:
            classColor = "bg-blue-500"
            break;
    
        default:
            classColor = "bg-stone-500/50"
            break;
    }
    return (
        <div className={`aspect-square col-sapn-1 rounded-md ${square.number === null ? 'bg-stone-300/50' : classColor} text-white flex-center font-bold text-2xl`}>
            {square.number}
        </div>
    )
}
