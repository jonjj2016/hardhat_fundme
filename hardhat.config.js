require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('dotenv').config()
require('solidity-coverage')
require('hardhat-deploy-ethers')

const GOERLI_IPS_URL = process.env.GOERLI_IPS_URL || 'https://eth-goerli'
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key'
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY || 'key'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: '0.8.17',
  solidity: { compilers: [{ version: '0.8.17' }, { version: '0.6.6' }] },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    goerli: {
      url: GOERLI_IPS_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
  },
  gasReporter: {
    enabled: true, //if need report switch to true
    outputFile: 'Reports/gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      5: 0,
    },
    user: {
      default: 1,
    },
  },
}
