// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GamaCoinFaucet is Ownable {
    IERC20 public token; // The Gama Coin token contract
    uint256 public faucetAmount; // Amount of tokens to be distributed per claim
    uint256 public cooldownTime; // Cooldown time between claims (e.g., 1 day)
    
    mapping(address => uint256) public lastClaimTime; // Track the last claim time per address

    event FaucetClaimed(address indexed claimer, uint256 amount);

    // Pass msg.sender to the Ownable constructor to set the initial owner
    constructor(address _tokenAddress, uint256 _faucetAmount, uint256 _cooldownTime) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
        faucetAmount = _faucetAmount; // e.g., 1000 GAMA
        cooldownTime = _cooldownTime; // e.g., 1 day = 86400 seconds
    }

    function claimFaucet() external {
        require(block.timestamp - lastClaimTime[msg.sender] >= cooldownTime, "Faucet: You need to wait before claiming again.");
        require(token.balanceOf(address(this)) >= faucetAmount, "Faucet: Not enough tokens in the faucet.");

        // Update last claim time
        lastClaimTime[msg.sender] = block.timestamp;

        // Transfer the faucet amount to the claimer
        token.transfer(msg.sender, faucetAmount);

        emit FaucetClaimed(msg.sender, faucetAmount);
    }

    // The owner can refill the faucet with more tokens
    function refillFaucet(uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), amount), "Faucet: Refill failed");
    }

    // The owner can update the faucet amount
    function updateFaucetAmount(uint256 newAmount) external onlyOwner {
        faucetAmount = newAmount;
    }

    // The owner can update the cooldown time
    function updateCooldownTime(uint256 newCooldownTime) external onlyOwner {
        cooldownTime = newCooldownTime;
    }

    // The owner can withdraw excess tokens in case they're needed
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= amount, "Faucet: Not enough tokens to withdraw.");
        token.transfer(msg.sender, amount);
    }
}
