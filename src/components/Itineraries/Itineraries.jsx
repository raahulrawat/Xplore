import React from 'react'
import itinerary from "../../assets/itinerary.png"

const Itineraries = () => {
    return (
        <div>
            <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
                <div className="flex-1 flex flex-col gap-10">

                    <h1 className="sm:text-6xl text-5xl text-black lg:max-w-lg font-bold leading-[120%]">
                        Explore The <span className="red-gradient">Diverse Realms</span> of
                        Travel First
                    </h1>
                </div>
                <div className="lg:flex-1 relative w-full h-[50vh] justify-center">
                    <img src={itinerary} alt="itinerary" fill className="object-contain" />
                </div>
            </header>
        </div>
    )
}

export default Itineraries