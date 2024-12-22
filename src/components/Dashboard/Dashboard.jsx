import React, { useState } from 'react';
import { motion } from 'framer-motion';
import itinerary from "../../assets/itinerary.png"
import Chatbot from "../Chatbot/Chatbot.jsx"
import "./Dashboard.css";
import Download from "../../assets/Download.svg";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useLocation } from 'react-router-dom';
import Alps from "../../assets/Alps.svg";
import Beach from '../../assets/Beach.svg';
import Bed from '../../assets/Bed.svg';
import Camel from '../../assets/Camel.svg';
// import EditText from '../../assets/EditText.svg';
import FoodBar from '../../assets/FoodBar.svg';
import Meditation from '../../assets/Meditation.svg';
// import message from '../../assets/message.svg';
import Museum from '../../assets/Museum.svg';
import SailBoat from '../../assets/SailBoat.svg';
import Trekking from '../../assets/Trekking.svg';
import defaultIcon from "../../assets/car.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const hotels = [
    {
        id: 1,
        name: "The Grand Hotel",
        image: "https://via.placeholder.com/150",
        location: "Downtown City Center",
        price: "$200/night",
        rating: 4.5,
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Parking"],
    },
    {
        id: 2,
        name: "Seaside Resort",
        image: "https://via.placeholder.com/150",
        location: "Near Beachfront",
        price: "$300/night",
        rating: 4.8,
        amenities: ["Beach Access", "Bar", "Gym", "Room Service"],
    },
    {
        id: 3,
        name: "Mountain Retreat",
        image: "https://via.placeholder.com/150",
        location: "Hilltop View",
        price: "$180/night",
        rating: 4.2,
        amenities: ["Scenic Views", "Hiking Trails", "Free Breakfast"],
    },
];

const iconMapping = {
    car_icon: defaultIcon,
    restaurant_icon: FoodBar,
    sightseeing_icon: Museum,
    rafting_icon: SailBoat,
    view_icon: Alps,
    accommodation_icon: Bed,
    dinner_icon: FoodBar,
    rest_icon: Bed,
    breakfast_icon: FoodBar,
    temple_icon: Meditation,
    picnic_icon: Camel,
    water_sports_icon: SailBoat,
    hiking_icon: Trekking,
    lunch_icon: FoodBar,
    park_icon: Alps,
    bonfire_icon: Trekking,
    home_icon: Beach,
};

const styles = `
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
.blink {
    animation: blink 1s infinite;
}
.blink:hover {
    animation: none;
}
`;

const TooltipContent = ({ node }) => {
    const IconComponent = iconMapping[node.icon] || defaultIcon;
    return (
        <div className="relative p-4 rounded-lg shadow-lg w-64" style={{ background: "#FFF5DF" }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45" style={{ background: "#FFF5DF" }}></div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-600">{node.time}</span>
            </div>
            <div className="flex flex-col items-center">
                <img height="30" width="30" src={IconComponent} alt={`${node.activity} icon`} className="mb-2" />
                <span style={{ textAlign: "center" }} className="text-zinc-800 font-medium">{node.activity}</span>
                <span className="text-zinc-500">{node.location}</span>
            </div>
        </div>
    )
};

const Dashboard = () => {
    const location = useLocation();
    const [firstNodeHovered, setFirstNodeHovered] = useState(false);
    const pageData = location.state.itinerary;
    const { day_wise_itinerary, timeline, additional_information } = pageData

    const nodes = [
        timeline?.start_node,
        ...timeline?.nodes
    ];

    const interests = [
        { color: '#1E3A8A', backgroundColor: '#DBEAFE' },
        { color: '#065F46', backgroundColor: '#D1FAE5' },
        { color: '#B91C1C', backgroundColor: '#FECACA' },
        { color: '#6D28D9', backgroundColor: '#EDE9FE' },
        { color: '#CA8A04', backgroundColor: '#FEF3C7' },
        { color: '#DB2777', backgroundColor: '#FCE7F3' },
        { color: '#0F766E', backgroundColor: '#CCFBF1' },
        { color: '#C2410C', backgroundColor: '#FFEDD5' },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 },
    };


    const handleExportPDF = async () => {
        const itineraryElement = document.getElementById("itinerary-container"); // Add an ID to the parent container of the itinerary
        if (!itineraryElement) return;
    
        try {
            const canvas = await html2canvas(itineraryElement, { scale: 2 });
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
    
            // Calculate dimensions for the PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("itinerary.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    // add ask email content here!!!
    const askEmail = {

    }
    const HotelTile = ({ hotel }) => {
        return (
            <div className="flex border rounded-lg shadow-md mb-4 overflow-hidden">
                {/* Hotel Image */}
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-1/4 object-cover h-40"
                />
    
                {/* Hotel Details */}
                <div className="p-4 w-3/4">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                    <p className="text-blue-500 font-medium mt-2">{hotel.price}</p>
    
                    {/* Rating */}
                    <div className="flex items-center text-yellow-400 mt-1">
                        <span className="mr-2">⭐</span> 
                        <span>{hotel.rating}</span>
                    </div>
    
                    {/* Amenities */}
                    <div className="mt-2">
                        <span className="text-sm font-semibold">Amenities:</span>
                        <ul className="text-sm text-gray-600 list-disc ml-5">
                            {hotel.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id='itinerary-container'>
            <div className='backgroundImg w-100' style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div class="flex justify-center items-center min-h-screen bg-cover bg-center">
                    <div class="bg-white rounded-xl shadow-lg text-center" style={{ padding: "40px" }}>
                        <h2 class="text-2xl font-bold mb-4">Your Itinerary is Ready!</h2>
                        <p class="text-zinc-700">You can chat with our bot to adjust filters for a more personalized experience.</p>
                        <button
        onClick={handleExportPDF}
        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
        
    >

        Export
    </button>
                    </div>
                </div>
            </div>

            <Chatbot {...location.state} />

            {/* stepper */}
            <div>
                <style>{styles}</style>
                <div className="flex justify-center w-full mt-10">
                    <ol className="flex items-center text-xs text-gray-900 font-medium sm:text-base">
                        {nodes.map((node, index) => {
                            const IconComponent = iconMapping[node.icon] || defaultIcon;
                            return (
                                <motion.li
                                    key={node.location}
                                    className={`flex width45 relative text-indigo-600 after:content-[''] after:w-full after:bg-gray-300 after:inline-block after:absolute ${index < nodes.length - 1
                                        ? 'lg:after:top-10 after:top-1/2 after:left-4 after:h-0.5'
                                        : ''
                                        }`}
                                    initial="hidden"
                                    animate="visible"
                                    variants={itemVariants}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Tippy
                                        content={<TooltipContent node={node} />}
                                        placement="bottom"
                                        theme="custom"
                                        className="custom-tooltip"
                                    >
                                        <div className="block whitespace-nowrap z-10">
                                            <div className="flex flex-col items-center">
                                                <motion.img
                                                    height="30"
                                                    width="30"
                                                    src={IconComponent}
                                                    alt={`${node.activity} icon`}
                                                    className="lg:w-6 lg:h-6 mb-2"
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={iconVariants}
                                                    transition={{ duration: 0.3, delay: index * 0.2 + 0.1 }}
                                                />
                                                <span
                                                    className={`w-4 h-4 lg:w-6 lg:h-6 hover:cursor-pointer hover:border-2 hover:border-black nodeColor border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-xs lg:text-sm text-white ${index === 0 && !firstNodeHovered ? 'blink' : ''
                                                        }`}
                                                    onMouseEnter={() => index === 0 && setFirstNodeHovered(true)}
                                                ></span>
                                            </div>
                                        </div>
                                    </Tippy>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>
            </div>
            <div className="hotel-listings mt-6">
            <h2 className="text-xl font-bold mb-4">Hotel Listings</h2>
            {hotels.map((hotel) => (
                <HotelTile key={hotel.id} hotel={hotel} />
            ))}
        </div>
            {/* day wise itinerary */}
            <div style={{ marginTop: "100px" }}>
                {Object.keys(day_wise_itinerary).map((day, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto"
                        style={{ marginTop: "30px", marginBottom: "20px" }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">{`Day ${index + 1}`}</h2>
                        <p className="text-md text-zinc-600 dark:text-zinc-300 mb-4">{day_wise_itinerary[day].description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center">
                            {day_wise_itinerary[day].activities.map((activity, idx) => (
                                <motion.div
                                    key={idx}
                                    style={{
                                        background: interests[idx % interests.length].backgroundColor,
                                        borderRadius: "20px",
                                        width: "100%",
                                        maxWidth: "400px"
                                    }}
                                    className="p-4 rounded-lg shadow-md"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="text-sm mb-2" style={{ color: interests[idx % interests.length].color }}>{activity.time}</p>
                                    <div className="flex items-start">
                                        <img height="30" width="30" aria-hidden="true" src={iconMapping[activity.icon] || defaultIcon} className="mr-3" />
                                        <h3 className="text-lg font-semibold" style={{ color: interests[idx % interests.length].color }}>{activity.title}</h3>
                                    </div>
                                    <p className="text-sm mt-2" style={{ color: interests[idx % interests.length].color }}>{activity.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* addition details */}
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10 mb-10">
                <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow-md radius20" style={{ background: interests[0].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[0].color }}>Time Estimation</h3>
                        <p className="text-sm" style={{ color: interests[0].color }}>{additional_information.time_estimation}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 radius20 shadow-md" style={{ background: interests[1].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[1].color }}>History</h3>
                        <p className="text-sm" style={{ color: interests[1].color }}>{additional_information.history}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 radius20 shadow-md" style={{ background: interests[2].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[2].color }}>Best Season to Visit</h3>
                        <p className="text-sm" style={{ color: interests[2].color }}>{additional_information.best_season_to_visit}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 radius20 shadow-md" style={{ background: interests[3].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[3].color }}>Food Options</h3>
                        <p className="text-sm" style={{ color: interests[3].color }}>{additional_information.food_options}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 radius20 shadow-md" style={{ background: interests[4].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[4].color }}>Latest News and Events</h3>
                        <p className="text-sm" style={{ color: interests[4].color }}>{additional_information.latest_news_and_events}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="p-4 radius20 shadow-md" style={{ background: interests[5].backgroundColor }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: interests[5].color }}>Cost Estimation</h3>
                        <ul className="list-disc pl-5">
                            <li className="text-sm" style={{ color: interests[5].color }}>
                                <span className="font-medium" style={{ color: interests[5].color }}>Accommodation:</span> {additional_information.cost_estimation.accommodation}
                            </li>
                            <li className="text-sm" style={{ color: interests[5].color }}>
                                <span className="font-medium" style={{ color: interests[5].color }}>Food:</span> {additional_information.cost_estimation.food}
                            </li>
                            <li className="text-sm" style={{ color: interests[5].color }}>
                                <span className="font-medium" style={{ color: interests[5].color }}>Transport:</span> {additional_information.cost_estimation.transport}
                            </li>
                            <li className="text-sm" style={{ color: interests[5].color }}>
                                <span className="font-medium" style={{ color: interests[5].color }}>Activities:</span> {additional_information.cost_estimation.activities}
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;