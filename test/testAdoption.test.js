const PetAdopt = artifacts.require("PetAdopt");
const helper = require('./utils/utils.js');

const SECONDS_IN_DAY = 86400;

contract("PetAdopt", (accounts) => {
 let petAdoption;

 before(async () => {
    petAdoption = await PetAdopt.deployed();
 });

 describe("adopting a pet and retrieving account addresses", async () => {
   before("adopt a pet using accounts[0]", async () => {
     await petAdoption.adopt(8, { from: accounts[0] });
     expectedAdopter = accounts[0];
   });

   it("can fetch the address of an owner by pet id", async () => {
    const adopter = await petAdoption.adopters(8);

    assert.equal(adopter["petOwner"], expectedAdopter, "The owner of the adopted pet should be the first account.");
  });

  it("can fetch the collection of all pet owners' addresses", async () => {
    const adopters = await petAdoption.getAdopters();
    assert.equal(adopters[8]["petOwner"], expectedAdopter, "The owner of the adopted pet should be in the collection.");
   });
   
   it("can return the pet to the shelter", async () => {
    await petAdoption.returnToShelter(8);
    const adopter = await petAdoption.adopters(8);
    assert.notEqual(adopter["petOwner"], expectedAdopter, "There is no owner for the adopted pet");
   });

   it("some user does a donation to the shelter", async () => {
    //Send 1 ETH
    await petAdoption.sendTransaction({ value: 1e+18, from: accounts[1] })
    const petAdoptionAddress = await petAdoption.address
    console.log(petAdoptionAddress)
    assert.equal(await web3.eth.getBalance(petAdoptionAddress), 1e+18)
   });

   it("some user does a donation to the shelter and money is withdraw by the owner", async () => {
    const ownerBalanceBeforeRemovingFunds = await web3.eth.getBalance(accounts[0])
    await helper.advanceTimeAndBlock(SECONDS_IN_DAY * 10); //advance 10 days
    await petAdoption.withdraw();
    const petAdoptionAddress = await petAdoption.address
    assert.equal(await web3.eth.getBalance(petAdoptionAddress), 0)
    assert.isAbove(parseInt(await web3.eth.getBalance(accounts[0])), parseInt(ownerBalanceBeforeRemovingFunds))
   });

   it("should abort since can not return the pet to the shelter because has been bought more than 1 week ago", async () => {
    let catchRevert = require("./utils/exceptions.js").catchRevert;
    await helper.advanceTimeAndBlock(SECONDS_IN_DAY * 10); //advance 10 days
    const adopter = await petAdoption.adopters(8);
    await catchRevert(petAdoption.returnToShelter(8));
   });
 });
});