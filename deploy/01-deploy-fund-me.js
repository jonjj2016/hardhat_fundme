const { ethers, network } = require('hardhat')
require('dotenv').config()
const { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  const ethUsdPriceFeedAddress = networkConfig[chainId]
  await deploy('FundMe', {
    from: deployer,
    args: [ethUsdPriceFeedAddress.ethUsdPriceFeed],
    log: true,
  })
}
