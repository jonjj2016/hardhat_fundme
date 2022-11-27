const { network } = require('hardhat')
require('dotenv').config()
const { networkConfig, developmentChains } = require('../helper-hardhat-config')

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
  log('Deploying FUND_ME Contract')
  await deploy('FundMe', {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  })
  log(
    '_________________________________DEPLOYED__________________________________________',
  )
}
module.exports.tags = ['all', 'fundme']
