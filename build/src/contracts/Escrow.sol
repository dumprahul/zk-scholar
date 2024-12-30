// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Deployed at 0x406AB5033423Dcb6391Ac9eEEad73294FA82Cfbc
//rating()- _applicant (address) and _rating (uint256)
//to check locked for rating- getLockedETH(address) and lockedETH(address)
//to get ratings- ratings(address)


contract ScholarshipEscrow {
    address public owner;
    mapping(address => uint256) public ratings;
    mapping(address => uint256) public lockedETH;
    
    uint256 public totalLocked;

    // Define the rate tiers
    uint256 constant tier1 = 40;    // No ETH locked for ratings 1-40
    uint256 constant tier2 = 50;    // 0.001 ETH for ratings 40-50
    uint256 constant tier3 = 60;    // 0.003 ETH for ratings 50-60
    uint256 constant tier4 = 80;    // 0.005 ETH for ratings 60-80
    uint256 constant tier5 = 100;   // 0.01 ETH for ratings 80-100

    constructor() {
        owner = msg.sender;
    }

    // Function to receive funds to be locked in the contract
    receive() external payable {}

    // Function to lock ETH based on rating passed to the function
    function rating(address _applicant, uint256 _rating) public onlyOwner {
        require(_rating >= 1 && _rating <= 100, "Rating must be between 1 and 100");

        // Save the rating for the applicant
        ratings[_applicant] = _rating;

        // Lock ETH based on the rating
        uint256 amountToLock = lockETHBasedOnRating(_rating);

        // Update the applicant's locked ETH
        if (amountToLock > 0) {
            lockedETH[_applicant] += amountToLock;
            totalLocked += amountToLock;
        }
    }

    // Function to lock ETH based on rating criteria
    function lockETHBasedOnRating(uint256 _rating) internal pure returns (uint256) {
        if (_rating > 40 && _rating <= 50) {
            return 0.001 ether;
        } else if (_rating > 50 && _rating <= 60) {
            return 0.003 ether;
        } else if (_rating > 60 && _rating <= 80) {
            return 0.005 ether;
        } else if (_rating > 80 && _rating <= 100) {
            return 0.01 ether;
        }
        return 0;
    }

    // Function to check the locked ETH for an applicant
    function getLockedETH(address _applicant) public view returns (uint256) {
        return lockedETH[_applicant];
    }

    // Allow the contract owner to withdraw excess ETH if needed
    function ownerWithdraw(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance - totalLocked, "Not enough available balance");
        payable(owner).transfer(amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }
}
