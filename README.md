Hardhat Fund Me

This is a section of the Javascript Blockchain/Smart Contract FreeCodeCamp Course.

⌨️ (10:00:48) Lesson 7: Hardhat Fund Me

Full Repo

Hardhat Fund Me
Getting Started
Requirements
Quickstart
Typescript
Optional Gitpod
Usage
Testing
Test Coverage
Deployment to a testnet or mainnet
Scripts
Estimate gas
Estimate gas cost in USD
Verify on etherscan
Linting
Formatting
Thank you!
This project is apart of the Hardhat FreeCodeCamp video.

Getting Started
Requirements
git
You'll know you did it right if you can run git --version and you see a response like git version x.x.x
Nodejs
You'll know you've installed nodejs right if you can run:
node --version and get an ouput like: vx.x.x
Yarn instead of npm
You'll know you've installed yarn right if you can run:
yarn --version and get an output like: x.x.x
You might need to install it with npm or corepack
Quickstart
git clone https://github.com/PatrickAlphaC/hardhat-fund-me-fcc
cd hardhat-fund-me-fcc
yarn
Typescript
For the typescript edition, run:

git checkout typescript
Optional Gitpod
If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the clone this repo part.

Open in Gitpod

Usage
Deploy:

yarn hardhat deploy
Testing
yarn hardhat test
Test Coverage
yarn hardhat coverage
Deployment to a testnet or mainnet
Setup environment variables
You'll want to set your GOERLI_RPC_URL and PRIVATE_KEY as environment variables. You can add them to a .env file, similar to what you see in .env.example.

PRIVATE_KEY: The private key of your account (like from metamask). NOTE: FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
You can learn how to export it here.
GOERLI_RPC_URL: This is url of the goerli testnet node you're working with. You can get setup with one for free from Alchemy
Get testnet ETH
Head over to faucets.chain.link and get some tesnet ETH. You should see the ETH show up in your metamask.

Deploy
yarn hardhat deploy --network goerli
Scripts
After deploy to a testnet or local net, you can run the scripts.

yarn hardhat run scripts/fund.js
or

yarn hardhat run scripts/withdraw.js
Estimate gas
You can estimate how much gas things cost by running:

yarn hardhat test
And you'll see and output file called gas-report.txt

Estimate gas cost in USD
To get a USD estimation of gas cost, you'll need a COINMARKETCAP_API_KEY environment variable. You can get one for free from CoinMarketCap.

Then, uncomment the line coinmarketcap: COINMARKETCAP_API_KEY, in hardhat.config.js to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

Verify on etherscan
If you deploy to a testnet or mainnet, you can verify it if you get an API Key from Etherscan and set it as an environemnt variable named ETHERSCAN_API_KEY. You can pop it into your .env file as seen in the .env.example.

In it's current state, if you have your api key set, it will auto verify goerli contracts!

However, you can manual verify with:

yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
Linting
solhint installation: Documentation

To check linting / code formatting:

yarn lint
or, to fix:

yarn lint:fix
Formatting
yarn format
Thank you!
If you appreciated this, feel free to follow me or donate!

ETH/Polygon/Avalanche/etc Address: 0x9680201d9c93d65a3603d2088d125e955c73BD65

Patrick Collins Twitter Patrick Collins YouTube Patrick Collins Linkedin Patrick Collins Medium
