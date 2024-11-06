# GAMA Coin Faucet

## Overview
The GAMA Coin Faucet is a web-based application designed to allow users to easily receive small amounts of GAMA Coin for free. It aims to promote the adoption of GAMA Coin within the community by providing a simple way for users to acquire tokens without needing to purchase them.

**Live Faucet Link**: [faucet.gamacoin.ai](https://faucet.gamacoin.ai)

## Features
- **Instant GAMA Coin Distribution**: Users can claim small amounts of GAMA Coin at regular intervals.
- **Secure and Reliable**: The faucet utilizes a smart contract deployed on the XDC Network to automate the distribution process, ensuring security and transparency.
- **User-Friendly Interface**: The front-end is designed for ease of use, allowing anyone to claim tokens with minimal effort.
- **Rate Limiting**: To prevent abuse, the faucet enforces limits on how often users can claim tokens.

## How It Works
1. **Connect Wallet**: Users connect their XDC-compatible wallet (e.g., Metamask) to the faucet.
2. **Claim GAMA Coin**: After connecting, users can request a small amount of GAMA Coin, which will be transferred directly to their wallet.
3. **Wait for the Next Claim**: Once a claim is made, the faucet enforces a waiting period before the user can claim again.

## Smart Contract
The faucet is backed by a smart contract that handles token distribution and enforces claim limits. This ensures a secure, transparent, and immutable process for users.

## Installation
To run the GAMA Coin Faucet locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/GAMA-Coin/Faucet.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Faucet
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to access the faucet.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

### How to Contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
