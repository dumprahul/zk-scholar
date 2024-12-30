import bg from '../assets/final.png';
import {ethers} from 'ethers';

export default function Final() {

  const { ethereum } = window;
  const contract_address="0x406AB5033423Dcb6391Ac9eEEad73294FA82Cfbc";
  const contract_abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_applicant",
				"type": "address"
			}
		],
		"name": "getLockedETH",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "lockedETH",
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
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ownerWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_applicant",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "rating",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ratings",
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
		"inputs": [],
		"name": "totalLocked",
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
		"stateMutability": "payable",
		"type": "receive"
	}
]
  const walletAddress="0xd5c8a73C875FB06D86fFF43E4F6ED7Cd3836ac80";
  const rating="77";


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

  const stake_function = async () => {
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }
        
        try {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contract_address, contract_abi, signer);
    
          const tx = await contract.rating(walletAddress,rating);
          await tx.wait();
          console.log("Transaction details:", tx);
          console.log("Transaction details:", tx.hash);

          console.log("decoding")
          const decodedInput = contract.interface.decodeFunctionData('rating', tx.data);
          console.log("Decoded Input Data:", decodedInput);


        } catch (error) {
          console.error("Error while transaction:", error);
        }
  };
    
  const handleStake = async () => {
        connect_wallet();
        await stake_function();
  };

 
  return (
    <>
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-6xl font-bold text-white">Dhamaka you have got scholarship🎉</h1>
        <div className="mt-6"></div>
        <h1 className="text-3xl text-white">You have got locked up amount of 0.05ETH ✅</h1>
        <div className="mt-6"></div>
        <h1 className="text-3xl text-white">now , ஸ்வீட் எடு கொண்டாடு 🍬</h1>
        <div className="mt-6"></div>
        <button className='btn btn-primary' onClick={handleStake}>Lock your funds now 🔥</button>
      </div>
    </>
  );
}
