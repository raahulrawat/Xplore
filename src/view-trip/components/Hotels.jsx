import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Hotels({ trip }) {

  const [response, setResponse] = useState(null);
  const location = trip?.userSelection?.location.display_name;
  useEffect(() => {
    if (!location) return;  // Wait until location is available
  
    const fetchData = async () => {
      try {
        const res = await axios.post('https://1b61-182-156-197-122.ngrok-free.app/get_hotels', {
          location: location,
          days: 1
        });
        setResponse(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [location]);

  if (!response || !response.hotels) {
    return <div>Loading hotel recommendations...</div>;
  }

  return (
    <div>
      <h2 className='font-bold text-xl my-7'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {response.hotels.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.gps_coordinates?.latitude},${hotel?.gps_coordinates?.longitude} (${encodeURIComponent(hotel?.name)} `}
            target='_blank'
            key={index}
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img
                src={hotel?.image}
                className='rounded-xl h-[180px] w-full object-cover'
                alt='Hotel'
              />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.name}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.nearby_places}</h2>
                <h2 className='font-medium'>💰 {hotel?.price}</h2>
                <h2 className='font-medium'>⭐ {hotel?.ratings}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
