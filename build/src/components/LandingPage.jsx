import bg from '../assets/bg.jpg';

import { useEffect, useState } from 'react';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from '@anon-aadhaar/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  // Access the Anon Aadhaar status
  const [anonAadhaar] = useAnonAadhaar();
  
  // Access the latest proof generated
  const [, latestProof] = useProver();
  
  // State to store proof
  const [storedProof, setStoredProof] = useState(null);

  // Navigate hook for routing
  const navigate = useNavigate();

  useEffect(() => {
    // Log Anon Aadhaar status whenever it changes
    console.log('Anon Aadhaar status: ', anonAadhaar.status);
    
    // Show notification when proof is valid
    if (anonAadhaar?.status === 'logged-in' && latestProof) {
      toast.success('Proof is valid 🎉', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          borderRadius: '10px', // Curved edges
          fontSize: '14px', // Smaller text size
          padding: '8px 16px', // Adjust the padding for a smaller toast
          backgroundColor: 'white', // Green background color (you can customize this)
          color: 'black', // White text color
        },
      });
      console.log("the proof is-", latestProof);
    }
  }, [anonAadhaar, latestProof]);

  // Function to handle storing proof
  const handleStoreProof = () => {
    if (latestProof) {
      setStoredProof(latestProof);
    }
  };

  return (
    <>
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-8xl font-bold text-white">zk-scholar 🇮🇳</h1>

        <div className="mt-6"></div>
        <LogInWithAnonAadhaar nullifierSeed={1234} fieldsToReveal={["revealAgeAbove18", "revealPinCode"]} _useTestAadhaar={true} />
        
        {/* Show buttons when proof is valid */}
        {anonAadhaar?.status === 'logged-in' && latestProof && (
          <div className="mt-6">
            {/* Show Proof Button */}
            <button 
              className="btn btn-primary"
              onClick={() => {
                document.getElementById('my_modal_1').showModal();
                handleStoreProof(); // Store the proof when clicked
              }}
            >
              Show Proof
            </button>

            {/* lesssgo Button */}
            <button 
              className="btn btn-primary ml-4"
              onClick={() => navigate('/choice')} // Navigate to /choice
            >
              Lesssgo
            </button>
          </div>
        )}
      </div>

      {/* Modal for showing proof */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Proof Details</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
            {JSON.stringify(storedProof, null, 2)}  {/* Display the stored proof */}
          </pre>
          <div className="modal-action">
            <button 
              className="btn"
              onClick={() => document.getElementById('my_modal_1').close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Toast Container for React Toastify */}
      <ToastContainer />
    </>
  );
}
