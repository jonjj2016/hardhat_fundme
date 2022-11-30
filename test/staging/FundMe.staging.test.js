const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async () => {
              //   another way to get accounts

              //   const accounts = await ethers.getSigners()
              //   const accountZero = accounts[0]

              //   deploy FundMe Contract useing hardhat deploy
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })
          describe("Constructor", async () => {
              it("Allow Users to fund and Withdraw", async () => {
                  await fundMe.fund({ value: sendValue })
                  await fundMe.withdraw()
                  const endingBallance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  assert.equal(String(endingBallance), "0")
              })
          })
      })
