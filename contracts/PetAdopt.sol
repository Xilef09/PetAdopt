// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract PetAdopt {
    Adoption[16] public adopters;
    
    struct Adoption {
        address petOwner;
        uint256 date;
    }

    //Address from the shop which creates the Smart Contract
    address public owner;
    uint256 public last_withdraw;

    modifier onlyOwner() {
        // check if the owner is sending the tx
        require( msg.sender == owner);
        _;
    }

    modifier weekAfter() {
        require(block.timestamp > last_withdraw + 1 weeks);
        _;
    }

    constructor() public {
        owner = msg.sender;
        last_withdraw = block.timestamp;
    }

    event Adopted(address _adopter, uint256 _petId);
    
    function adopt(uint256 _petId) external {
        require(_petId >= 0 && _petId <= 15);
        require(adopters[_petId].petOwner == address(0x0));
        
        adopters[_petId].petOwner = msg.sender;
        adopters[_petId].date  = block.timestamp;

        emit Adopted(msg.sender, _petId);
    }
    
    function returnToShelter(uint256 _petId) public {
        require (adopters[_petId].petOwner == msg.sender);
        //Adopters can return the pet in a week time.
        require (block.timestamp < adopters[_petId].date + 7 days);
        
        adopters[_petId].petOwner = address(0x0);
        adopters[_petId].date = 0;
    }

    function getAdopters() public view returns (Adoption[16] memory) {
        return adopters;
    }

    //Allows the smart contract to accept money
    receive() external payable {}

    function withdraw() external onlyOwner weekAfter  {
        last_withdraw = block.timestamp;
        msg.sender.transfer(address(this).balance);
    }

    function withdraw(uint256 amount) external onlyOwner weekAfter {
        last_withdraw = block.timestamp;
        msg.sender.transfer(amount);
    }
}