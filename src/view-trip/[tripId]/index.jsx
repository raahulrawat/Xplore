import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { FiDownload } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [saving, setSaving] = useState(false);
  const tripRef = useRef(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast.error('No trip found!');
    }
  };

  const handleSaveFullItinerary = async () => {
    if (!tripRef.current) return;

    try {
      setSaving(true); // Start loading
      const input = tripRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = {
        width: canvas.width,
        height: canvas.height
      };

      const imgWidthMM = pdfWidth;
      const imgHeightMM = (imgProps.height * imgWidthMM) / imgProps.width;

      let heightLeft = imgHeightMM;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidthMM, imgHeightMM);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidthMM, imgHeightMM);
        heightLeft -= pdfHeight;
      }

      pdf.save('itinerary.pdf');
      toast.success('Itinerary saved as PDF!');
    } catch (error) {
      console.error('Error saving full itinerary:', error);
      toast.error('Failed to save itinerary. Please try again.');
    } finally {
      setSaving(false); // Stop loading
    }
  };

  if (!trip) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Save Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleSaveFullItinerary}
          className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 flex items-center justify-center min-w-[50px]"
          title="Download Itinerary"
          aria-label="Download itinerary as PDF"
          disabled={saving}
        >
          {saving ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <FiDownload className="text-2xl" />
          )}
        </button>
      </div>

      {/* Trip Content */}
      <div ref={tripRef} className="p-10 md:px-20 lg:px-44 xl:px-56 bg-white">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
        <Footer trip={trip} />
      </div>
    </div>
  );
}

export default ViewTrip;
