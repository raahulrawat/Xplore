import { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import fetchPhoto from '../../service/GlobalApi';
import placeImage from '../place.png';
import axios from 'axios'; // ✅ Import Axios to send email

const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // ✅ State to store user info

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Parse and store user
    }
  }, []);

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (!trip || !trip.userSelection || !trip.userSelection.location) return;

      const query = trip.userSelection.location?.display_name;

      try {
        const photo = await fetchPhoto(query);
        setPhotoUrl(photo);
      } catch (error) {
        console.error('Error fetching place photo:', error.message);
        setPhotoUrl(PHOTO_REF_URL);
      }
    };

    fetchPlacePhoto();
  }, [trip]);

  const handleSendEstimate = async () => {
    if (!user) {
      alert("User not signed in. Please sign in to get an estimate.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/generate_lead', {
        email: user.email,
        name: user.name,
        itinerary_details: JSON.stringify(trip.userSelection),
      });

      alert("Estimate request sent successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending estimate email:", error.message);
      alert("Failed to send estimate. Please try again.");
    }
  };

  if (!trip || !trip.userSelection) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center h-[600px]">
      <div className="relative w-full">
        <img 
          src={photoUrl || placeImage}
          alt={`Photo of ${trip.userSelection.location?.display_name || 'trip location'}`} 
          className="h-[470px] w-full object-cover rounded-xl mb-4"
          onError={(e) => { e.target.onerror = null; e.target.src = placeImage }}
        />
        <button 
          className="absolute bottom-[-55px] right-8 p-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <IoIosSend />
          More
        </button>
      </div>

      <div className="w-full flex flex-col items-start px-4 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <IoLocationSharp className="text-xl text-gray-600" />
          <h2 className='font-bold text-2xl'>
            {trip.userSelection.location?.display_name || 'Location not available'}
          </h2>
        </div>
        <div className='flex gap-5 justify-start'>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            📆 {trip.userSelection.days || 'Days not specified'} {trip.userSelection.days === 1 ? 'Day' : 'Days'}
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            💰 {trip.userSelection.budget ? `${trip.userSelection.budget} Budget` : 'Budget not specified'}
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            🥂 No. Of Travelers: {trip.userSelection.traveler || 'Travelers not specified'}
          </h2>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-96 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center mb-4">What would you like to do?</h2>
            <a href="/aiagent">
            <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
              Connect with Travel AI Agent
            </button> </a>

            <button 
              className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600"
              onClick={handleSendEstimate}
            >
              Get Estimate
            </button>

            <button 
              className="text-gray-500 text-sm mt-2 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoSection;
