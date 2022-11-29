const { deployments, ethers, getNamedAccounts } = require('hardhat')
const { assert, expect } = require('chai')

describe('FundMe', async () => {
  let fundMe
  let deployer
  let mockV3Aggregator
  beforeEach(async () => {
    //   another way to get accounts

    //   const accounts = await ethers.getSigners()
    //   const accountZero = accounts[0]

    //   deploy FundMe Contract useing hardhat deploy
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(['all'])
    fundMe = await ethers.getContract('FundMe', deployer)
    mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer)
  })
  describe('Constructor', async () => {
    it('Sets the aggregator addresses correctly', async () => {
      const res = await fundMe.priceFeed()
      assert.equal(res, mockV3Aggregator.address)
    })
  })
  describe('Fund', async () => {
    it('Fails if not enough Eth', async () => {
      // testing for failing
      await expect(fundMe.fund()).to.be.reverted
    })
  })
})
