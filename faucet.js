// Contract and Web3 Setup
let web3;
let faucetContract;
let userAccount;

const faucetContractAddress = "0x05d8ea15B3C540C0f5c5935AFc2217fbd268Dda9"; // New faucet contract address

// Updated ABI for the faucet contract
const faucetABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_tokenAddress", "type": "address" },
            { "internalType": "uint256", "name": "_faucetAmount", "type": "uint256" },
            { "internalType": "uint256", "name": "_cooldownTime", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "claimer", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "FaucetClaimed",
        "type": "event"
    },
    { "inputs": [], "name": "claimFaucet", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "cooldownTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "faucetAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastClaimTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "refillFaucet", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "newCooldownTime", "type": "uint256" }], "name": "updateCooldownTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "newAmount", "type": "uint256" }], "name": "updateFaucetAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

// Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const requestTokensBtn = document.getElementById('requestTokensBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const statusDisplay = document.getElementById('status');

// Check for MetaMask
function checkMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        return true;
    } else {
        console.log('Please install MetaMask!');
        statusDisplay.innerText = 'Please install MetaMask!';
        return false;
    }
}

// Connect Wallet Function
connectWalletBtn.addEventListener('click', async () => {
    if (checkMetaMask()) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            walletAddressDisplay.innerText = `Connected: ${userAccount}`;
            requestTokensBtn.disabled = false;

            faucetContract = new web3.eth.Contract(faucetABI, faucetContractAddress);
            statusDisplay.innerText = 'Wallet connected successfully!';
        } catch (error) {
            console.error('User denied account access', error);
            statusDisplay.innerText = 'Error connecting wallet. Please try again.';
        }
    }
});

// Request Tokens Function
requestTokensBtn.addEventListener('click', async () => {
    if (!userAccount) {
        statusDisplay.innerText = 'Please connect your wallet first.';
        return;
    }

    try {
        statusDisplay.innerText = 'Requesting tokens...';

        const gasPrice = await web3.eth.getGasPrice();
        const receipt = await faucetContract.methods.claimFaucet().send({
            from: userAccount,
            gasPrice: gasPrice,
        });

        const txHash = receipt.transactionHash;
        statusDisplay.innerHTML = `Tokens successfully requested!<br>
            <a href="https://explorer.apothem.network/tx/${txHash}" target="_blank">View Transaction</a>`;
    } catch (error) {
        console.error('Error requesting tokens', error);
        statusDisplay.innerText = `Error requesting tokens: ${error.message}`;
    }
});
