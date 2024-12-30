




//

import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import { ethers } from "ethers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      toast.error("MetaMask is not installed! Please install it to use this feature.");
      return null;
    }

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      console.log("Connected account:", address);
      setWalletAddress(address); // Set the connected wallet address
      toast.success("Wallet successfully connected!");
      
      // Navigate to /testend after successful connection
      
      navigate('/testend');
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      return null;
    }
  };

  const formatWalletAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={true} 
        closeOnClick 
        pauseOnHover 
        draggable 
        limit={1}
      />
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-5xl font-bold text-white">Congrats, you are up to the mark 🎉</h1>
        <p className="mt-4 text-lg text-white text-center font-bold max-w-4xl mx-auto">
          Now connect your wallet to take up your test.
        </p>
        <div className="mt-6"></div>
        <button 
          className="btn btn-primary"
          onClick={connectWallet}
        >
          {walletAddress ? `Connected : ${formatWalletAddress(walletAddress)} ✅` : "Connect Wallet 💳"}
        </button>    
      </div>
    </>
  );
}
