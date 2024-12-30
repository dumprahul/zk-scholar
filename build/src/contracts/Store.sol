// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


//Deployed at 0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005
//store()- store(address walletAddress, string memory proofGenerated, uint256 timestamp)
//retrieve user details-getUserDetails(uint256 index)
//to get count-getUserDetailsCount()

contract UserDetails {

    // Define a structure to hold user details
    struct UserDetail {
        uint256 index;
        address walletAddress;
        string proofGenerated;
        uint256 timestamp;
    }

    // Declare an array to store all user details
    UserDetail[] public userDetails;

    // Declare a variable to track the next available index (starts from 0)
    uint256 public nextIndex = 0;

    // Function to store user details with an automatically incremented index
    function store(address walletAddress, string memory proofGenerated, uint256 timestamp) public {
        uint256 index = nextIndex; // Get the current index value

        // Increment the index for the next call
        nextIndex++;

        // Create a new UserDetail struct and store it in the array
        userDetails.push(UserDetail({
            index: index,
            walletAddress: walletAddress,
            proofGenerated: proofGenerated,
            timestamp: timestamp
        }));
    }

    // Function to retrieve user details by index
    function getUserDetails(uint256 index) public view returns (uint256, address, string memory, uint256) {
        require(index < userDetails.length, "Index out of bounds");
        UserDetail memory user = userDetails[index];
        return (user.index, user.walletAddress, user.proofGenerated, user.timestamp);
    }

    // Function to get the total number of user details stored
    function getUserDetailsCount() public view returns (uint256) {
        return userDetails.length;
    }
}
