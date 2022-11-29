const { network } = require('hardhat')
require('dotenv').config()
const { networkConfig, developmentChains } = require('../helper-hardhat-config')
const { verify } = require('../Utils/Verify')

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let ethUsdPriceFeedAddress
  log(
    '________________________________ DEPLOYING FUND_ME ________________________________',
  )
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  }
  const args = [ethUsdPriceFeedAddress]
  log('Deploying FUND_ME Contract')
  const fundMe = await deploy('FundMe', {
    from: deployer,
    args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log('Verifying')
    await verify(fundMe.address, args)
  }
  log(
    '_________________________________DEPLOYED__________________________________________',
  )
}
module.exports.tags = ['all', 'fundme']
