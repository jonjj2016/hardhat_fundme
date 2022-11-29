// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "hardhat/console.sol";

error FundMe__NotOwner();

/// @title A Contract for CrowdFunding
/// @author Jon Martirosyan
/// @notice Simple Funding Demo Contract
/// @dev This implements Pricefeeds as our library
contract FundMe {
    // Type Declertations
    using PriceConverter for uint256;
    // State Variables
    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_founders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    AggregatorV3Interface public s_priceFeed;
    // Modifiers next
    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // Receive and fallback functions next
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    /// @notice This Function  Funds this Contract
    /// @dev This implements Pricefeeds as our library
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_founders.push(msg.sender);
    }

    // function getVersion() public view returns (uint256){
    //     // ETH/USD price feed address of Goerli Network.
    //     AggregatorV3Interface s_priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
    //     return s_priceFeed.version();
    // }

    function withdraw() public onlyOwner {
        // console.log("Console.log From Solidity", msg.sender);
        for (
            uint256 funderIndex = 0;
            funderIndex < s_founders.length;
            funderIndex++
        ) {
            address funder = s_founders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_founders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory founders = s_founders;
        for (
            uint256 funderIndex = 0;
            funderIndex < founders.length;
            funderIndex++
        ) {
            address funder = founders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_founders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \
    //         yes  no
    //         /     \
    //    receive()?  fallback()
    //     /   \
    //   yes   no
    //  /        \
    //receive()  fallback()
}

// Concepts we didn't cover yet (will cover in later sections)
// 1. Enum
// 2. Events
// 3. Try / Catch
// 4. Function Selector
// 5. abi.encode / decode
// 6. Hash with keccak256
// 7. Yul / Assembly
