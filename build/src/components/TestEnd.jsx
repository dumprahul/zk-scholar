import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const { ethereum } = window;
  const contract_address = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c";
  const contract_abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getUserDetails",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserDetailsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "proofGenerated",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userDetails",
      "outputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "proofGenerated",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const walletAddress = "0xd5c8a73C875FB06D86fFF43E4F6ED7Cd3836ac80";
  const proofGenerated = "8ade6fce-d644-43c3-be71-04f664efe0b0";
  const timestamp = "121";

  const location = useLocation();
  const { proof } = location.state || {};

  const [isFundsButtonVisible, setIsFundsButtonVisible] = useState(false); // State for the "Check your Locked up funds" button
  const navigate = useNavigate();

  const connect_wallet = async () => {
    if (!ethereum) {
      alert("MetaMask is not installed!");
      return;
    }
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Store function
  const store_function = async () => {
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contract_address, contract_abi, signer);

      const tx = await contract.store(walletAddress, proofGenerated, timestamp);
      await tx.wait();
      console.log("Transaction details:", tx);
      console.log("Transaction details:", tx.hash);

          console.log("decoding")
          const decodedInput = contract.interface.decodeFunctionData('store', tx.data);
          console.log("Decoded Input Data:", decodedInput);

      
      // Show the "Check your Locked up funds" button after successful transaction
      setIsFundsButtonVisible(true);

    } catch (error) {
      console.error("Error while transaction:", error);
    }
  };

  const handleStore = async () => {
    connect_wallet();
    

    await store_function();
  };

  const handleCheckFunds = () => {
    // Navigate to the '/final' page when the "Check your Locked up funds" button is clicked
    navigate('/final');
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-6xl font-bold text-white">Yaaaayy, you have made it 🎉</h1>
        <div className="mt-6"></div>

        <h1 className="text-3xl font-bold text-white">Your results are being analyzed by 0xAgent 🔥</h1>
        <div className="mt-6"></div>
        <button
          className="btn btn-primary"
          onClick={handleStore}
        >
          Submit your test ✅
        </button>

        {/* "Check your Locked up funds" button */}
        {isFundsButtonVisible && (
          <button
            className="mt-4 btn btn-secondary"
            onClick={handleCheckFunds}
          >
            Check your Locked up funds 💰
          </button>
        )}
      </div>
    </>
  );
}
