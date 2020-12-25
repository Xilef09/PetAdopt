
# Pet adoption example

 >This example is solidity app that allows you to adopt a pet using ethereum blockchain. This is an exercise for a Blockchain course.

## Description

It consist basically into one smart contract with the following methods  

- Adopt: method used to adopt a pet
- ReturnToShelter: method used to return a pet to the shelter, in a maximum time of a week
- GetAdopters: return a struct with all adopters information. To be able to return the struct in the function is used

    ```js
    pragma experimental ABIEncoderV2;
    ```

- receive: This method makes the Smart Contract payable
- withdraw: This method withdraws the money of the smart contract to the shop itself

## Environment

- Truffle v5.1.58
- Solidity ^0.7.4
- Node v12.16.2
- Ganache

## Instructions

1. Download the code from this repo.

2. Install package dependencies.

    ```sh
    npm install
    ```

3. Compile contracts inside `contracts/`

    ```sh
    truffle compile
    ```

    If this command does not work install truffle manually

    ```sh
    truffle install -g truffle
    ```

4. Migrate the contracts to the blockchain. The migrations files are under `migrations`

    ```sh
    truffle migrate
    ```

5. Test the contracts work as expected. Test are defined in `test` folder

    ```sh
    truffle test
    ```

This command execute the unit test that are inside the test folder.

## Future work

For future work would be interesting to add a front end to the dapp, with web3 js. At the moment there has been some problem with the returning struct so that the frontend is not working yet, and is also not included in this repository. Will be included in a near future
