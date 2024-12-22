import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoFilterOutline } from "react-icons/io5";
import { LiaRouteSolid } from "react-icons/lia";
import { BiMicrophone } from 'react-icons/bi';
import { BsFillMicFill } from 'react-icons/bs';
import { AiFillCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import imgTop from "../../assets/Charco Travel.svg"
import imgBot from "../../assets/Charco Travel International.svg"
import imgLeft from "../../assets/Nomads Biking.svg"
import "./Explore.css";
import Modal from '../Modal/Modal';
import plusIcon from "../../assets/Plus.svg"
import minusIcon from "../../assets/Subtract.svg"
import { POST_REQUEST } from '../../common/HttpRequest';
import { BASE_URL, endPonts } from '../../config/endPoint';
import Loader from '../../common/Loader/Loader';

const Explore = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [startPoint, setStartPoint] = useState()
    const [endPoint, setEndPoint] = useState()
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [budget, setBudget] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const interests = [
        { name: 'Adventure', color: '#1E3A8A', backgroundColor: '#DBEAFE' },
        { name: 'Museums', color: '#065F46', backgroundColor: '#D1FAE5' },
        { name: 'Romance', color: '#B91C1C', backgroundColor: '#FECACA' },
        { name: 'Arts & Cultural', color: '#6D28D9', backgroundColor: '#EDE9FE' },
        { name: 'Kid-friendly', color: '#CA8A04', backgroundColor: '#FEF3C7' },
        { name: 'Shopping', color: '#DB2777', backgroundColor: '#FCE7F3' },
        { name: 'Relaxation', color: '#0F766E', backgroundColor: '#CCFBF1' },
        { name: 'Local food', color: '#C2410C', backgroundColor: '#FFEDD5' },
    ];

    const handleIncrement = (setter) => () => {
        setter(prevCount => prevCount + 1);
    };

    const handleDecrement = (setter) => () => {
        setter(prevCount => Math.max(1, prevCount - 1));
    };

    const isDisabled = !startPoint || !endPoint;

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleInterestClick = (interest) => {
        setSelectedInterests((prevSelected) => {
            if (prevSelected.includes(interest)) {
                return prevSelected.filter((i) => i !== interest);
            } else {
                return [...prevSelected, interest];
            }
        });
    };


    const CounterControl = ({ label, value, onIncrement, onDecrement }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 mb-3">{label}</label>
            <div className="flex items-center space-x-2">
                <button onClick={onDecrement} className="p-2 rounded-full" style={{ border: "1px solid #D8D8D8", borderRadius: "12px" }}>
                    <img alt="minus" src={minusIcon} />
                </button>
                <span className="text-lg font-semibold">{value}</span>
                <button onClick={onIncrement} className="p-2 rounded-full" style={{ border: "1px solid #D8D8D8", borderRadius: "12px" }}>
                    <img alt="plus" src={plusIcon} />
                </button>
            </div>
        </div>
    );

    // console.log("selectedInterests", startPoint, endPoint, selectedInterests, numberOfPeople, numberOfDays, budget);

    const getDetails = () => {
        setIsLoading(true);
        let apiUrl = BASE_URL + endPonts.getDeails
        const requestData = {
            prompt: {
                start: startPoint,
                destination: endPoint,
                total_days: numberOfDays,
                selectedInterests: selectedInterests,
                budget: budget,
                numberOfPeople: numberOfPeople
            },
            user_id: 'raahul'
        };
        POST_REQUEST(apiUrl, requestData)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                navigate("/dashboard", { state: res.data.response });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("err", err)
            })
    }

    return (
        <div style={{ height: "850px" }}>
            <div className='backgroundImg w-100' style={{ height: "490px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {!isOpen && <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4" style={{ maxWidth: "600px", width: "550px" }}>
                    <h1 class="text-2xl font-bold text-zinc-900">Plan Your Dream Trip!</h1>
                    <p class="text-zinc-600">Create a personalized itinerary in minutes</p>
                    <div class="space-y-3">
                        <div class="flex items-center border border-zinc-300 rounded-lg p-2">
                            <input value={startPoint} onChange={(e) => setStartPoint(e.target.value)} type="text" placeholder="Enter your starting point..." class="flex-1 outline-none text-zinc-700" />
                            <AiOutlineSearch className="text-xl text-slate-400" />
                        </div>
                        <div class="flex items-center border border-zinc-300 rounded-lg p-2">
                            <input value={endPoint} onChange={(e) => setEndPoint(e.target.value)} type="text" placeholder="Enter where would you like to go..." class="flex-1 outline-none text-zinc-700" />
                            <AiOutlineSearch className="text-xl text-slate-400" />
                        </div>
                    </div>
                    <button disabled={isDisabled} onClick={toggleModal} style={{ background: isDisabled ? 'rgb(133 172 160)' : '#306152' }} class="w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Let's Go
                    </button>
                </div>}
                {isOpen && <div class=" inset-0 bg-opacity-50 flex justify-center items-center" style={{ position: "absolute", top: "330px" }}>
                    <div class="bg-white p-6 rounded-lg max-w-lg w-full mx-4" style={{ maxWidth: "850px" }}>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Create Itinerary</h2>
                            <button onClick={toggleModal} class="text-zinc-600 hover:text-zinc-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <div class="space-y-3">
                                <div class="flex items-center border border-zinc-300 rounded-lg p-2">
                                    <input value={startPoint} onChange={(e) => setStartPoint(e.target.value)} type="text" placeholder="Enter your starting point..." class="flex-1 outline-none text-zinc-700" />
                                    <AiOutlineSearch className="text-xl text-slate-400" />  
                                </div>
                                <div class="flex items-center border border-zinc-300 rounded-lg p-2">
                                    <input value={endPoint} onChange={(e) => setEndPoint(e.target.value)} type="text" placeholder="Enter where would you like to go..." class="flex-1 outline-none text-zinc-700" />
                                    <AiOutlineSearch className="text-xl text-slate-400" />
                                </div>
                            </div>
                            <button
                                className="mt-2 text-white hover:text-white text-sm bg-blue-400 px-3 py-2 mb-12"
                                style={{ backgroundColor: '#64ADE1', borderRadius: "12px" }}
                            >
                                <sapn style={{ fontWeight: "800" }}>+</sapn> Add destination
                            </button>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-zinc-700">Select your interests</label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {interests.map((interest) => (
                                        <span
                                            key={interest.name}
                                            style={{
                                                color: selectedInterests.includes(interest.name) ? interest.color : interest.color,
                                                backgroundColor: selectedInterests.includes(interest.name) ? interest.backgroundColor : 'transparent',
                                                border: `1px solid ${selectedInterests.includes(interest.name) ? 'transparent' : interest.color}`
                                            }}
                                            className={`px-3 py-1 text-sm rounded-full cursor-pointer`}
                                            onClick={() => handleInterestClick(interest.name)}
                                        >
                                            {interest.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <CounterControl
                                label="Select number of people"
                                value={numberOfPeople}
                                onIncrement={handleIncrement(setNumberOfPeople)}
                                onDecrement={handleDecrement(setNumberOfPeople)}
                            />
                            <CounterControl
                                label="Select number of days"
                                value={numberOfDays}
                                onIncrement={handleIncrement(setNumberOfDays)}
                                onDecrement={handleDecrement(setNumberOfDays)}
                            />

                            <div class="mb-4">
                                <label for="budget" class="block text-sm font-medium text-zinc-700">What is your budget?</label>
                                <input value={budget} onChange={(e) => setBudget(e.target.value)} type="text" id="budget" class="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your budget..." />
                            </div>
                            <button
                                onClick={getDetails}
                                style={{ background: '#306152' }}
                                type="submit"
                                className="text-white font-bold py-2 px-4 rounded-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                                            ></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    'Create Itinerary'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
            {!isOpen && <div style={{ marginLeft: "180px", paddingBottom: "40px" }}>
                <div style={{ fontWeight: "700", fontSize: "30px", marginTop: "30px" }}>Plan Your Perfect Trip in 3 Easy Steps</div>
                <div class="p-6 bg-white  dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-lg" style={{ maxWidth: "900px", marginTop: "30px" }}>
                    <div class="flex flex-col md:flex-row">
                        <div class="flex-1" style={{ display: "grid" }}>
                            <div class="flex items-center mb-4">
                                <div class="p-2 rounded-full bg-zinc-200 text-blue-600">
                                    <AiOutlineSearch className="text-xl text-slate-400" />
                                </div>
                                <div class="ml-3">
                                    <h4 class="text-lg font-semibold">Select preferences</h4>
                                    <p class="text-sm text-zinc-600">Enter your origin, destination, and travel details</p>
                                </div>
                            </div>
                            <div class="flex items-center mb-4">
                                <div class="p-2 rounded-full bg-zinc-200 text-blue-600">
                                    <IoFilterOutline className="text-xl text-slate-400" />
                                </div>
                                <div class="ml-3">
                                    <h4 class="text-lg font-semibold">Customize experience</h4>
                                    <p class="text-sm text-zinc-600">Pick your favorite activities and interests</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="p-2 rounded-full bg-zinc-200 text-blue-600">
                                    <LiaRouteSolid className="text-xl text-slate-400" />
                                </div>
                                <div class="ml-3">
                                    <h4 class="text-lg font-semibold">Get itinerary</h4>
                                    <p class="text-sm text-zinc-600">Receive a custom timeline with top recommendations</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 mt-6 md:mt-0 md:ml-6" style={{ display: "flex" }}>
                            <img src={imgLeft} width="200" alt="Travel Illustration" class="rounded-lg" />
                            <div><img src={imgBot} alt="Travel Illustration" class="rounded-lg" />
                                <img src={imgTop} alt="Travel Illustration" class="rounded-lg" /> </div>
                        </div>
                    </div>
                </div>
            </div>}
            {isLoading && <Loader />}
        </div>

    );
};

export default Explore;
