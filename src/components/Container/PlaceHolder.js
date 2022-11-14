import React, { useEffect, useRef } from 'react'

const PlaceHolder = () => {

    useEffect(() => {

        handleWindowResizing()
        window.addEventListener("resize", handleWindowResizing)

        return () => window.removeEventListener("resize", handleWindowResizing)

    }, [])

    const handleWindowResizing = () => {
        let placeHolderWidth = placeHolderRef.current.clientWidth;
        document.body.style.setProperty("--tile-width", `${placeHolderWidth}px`)
    }

    const placeHolderRef = useRef(null)
    return (
        <div ref={placeHolderRef} className='place-holder col-sapn-1 aspect-square rounded-md bg-stone-300/50 text-white flex-center font-bold text-2xl'>

        </div>
    )
}


export default PlaceHolder;