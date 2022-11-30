const { deployments, ethers, getNamedAccounts, network } = require('hardhat')
const { assert, expect } = require('chai')
const { developmentChains } = require('../../helper-hardhat-config')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('FundMe', async () => {
      let fundMe
      let deployer
      let mockV3Aggregator
      const sendValue = ethers.utils.parseEther('1')
      beforeEach(async () => {
        //   another way to get accounts

        //   const accounts = await ethers.getSigners()
        //   const accountZero = accounts[0]

        //   deploy FundMe Contract useing hardhat deploy
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(['all'])
        fundMe = await ethers.getContract('FundMe', deployer)
        mockV3Aggregator = await ethers.getContract(
          'MockV3Aggregator',
          deployer,
        )
      })
      describe('Constructor', async () => {
        it('Sets the aggregator addresses correctly', async () => {
          const res = await fundMe.getPriceFeed()
          assert.equal(res, mockV3Aggregator.address)
        })
      })
      describe('Fund', async () => {
        it('Fails if not enough Eth', async () => {
          // testing for failing
          await expect(fundMe.fund()).to.be.revertedWith(
            'You need to spend more ETH!',
          )
        })
        it('Updated the amount funded data structure', async () => {
          await fundMe.fund({ value: sendValue })
          const res = await fundMe.getAddressToAmountFunded(deployer)
          assert.equal(String(res), String(sendValue))
        })
        it('Adds founders to array of Founders', async () => {
          await fundMe.fund({ value: sendValue })
          const founder = await fundMe.getFunder(0)
          assert.equal(founder, deployer)
        })
      })
      describe('Withdraw', async () => {
        beforeEach(async () => {
          await fundMe.fund({ value: sendValue })
        })
        it('Withdraw from a single founder', async () => {
          //   Arrange
          const startingFundMeBallance = await fundMe.provider.getBalance(
            fundMe.address,
          )
          const startingDeployerBallance = await fundMe.provider.getBalance(
            deployer,
          )

          //   Act
          const transactionResponse = await fundMe.withdraw()
          const transactionReceipt = await transactionResponse.wait(1)
          const { gasUsed, effectiveGasPrice } = transactionReceipt
          const gasCost = gasUsed.mul(effectiveGasPrice)
          const endingFundMeBallance = await fundMe.provider.getBalance(
            fundMe.address,
          )
          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer,
          )
          //   Assert
          assert.equal(endingFundMeBallance, 0)
          assert.equal(
            String(startingFundMeBallance.add(startingDeployerBallance)),
            String(endingDeployerBalance.add(gasCost)),
          )
        })
        it('Allows Us to Withdraw with Multiple Founders', async () => {
          // Arrange
          const accounts = await ethers.getSigners()
          for (let i = 1; i < 7; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i])
            await fundMeConnectedContract.fund({ value: sendValue })
          }
          const startingFundMeBallance = await fundMe.provider.getBalance(
            fundMe.address,
          )
          const startingDeployerBallance = await fundMe.provider.getBalance(
            deployer,
          )
          //   Act
          const transactionResponse = await fundMe.withdraw()
          const transactionReceipt = await transactionResponse.wait(1)
          const { gasUsed, effectiveGasPrice } = transactionReceipt
          const gasCost = gasUsed.mul(effectiveGasPrice)
          const endingFundMeBallance = await fundMe.provider.getBalance(
            fundMe.address,
          )
          const endingDeployerBalance = await fundMe.provider.getBalance(
            deployer,
          )

          // assert
          assert.equal(endingFundMeBallance, 0)
          assert.equal(
            String(startingFundMeBallance.add(startingDeployerBallance)),
            String(endingDeployerBalance.add(gasCost)),
          )
          // assert that we have reseted founders array
          await expect(fundMe.getFunder(0)).to.be.reverted
          for (let i; i < 7; i++) {
            assert.equal(
              await fundMe.getAddressToAmountFunded(accounts[i].address),
              0,
            )
          }
        })
        it('Only Author can Withdraw', async () => {
          const accounts = await ethers.getSigners()
          for (let i = 1; i < 7; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i])
            await fundMeConnectedContract.fund({ value: sendValue })
          }

          //   Act
          const attacker = await fundMe.connect(accounts[2])
          await expect(attacker.withdraw()).to.be.rejectedWith(
            'FundMe__NotOwner',
          )
        })
      })
      it('Cheap Withdraw from a single founder', async () => {
        //   Arrange
        const startingFundMeBallance = await fundMe.provider.getBalance(
          fundMe.address,
        )
        const startingDeployerBallance = await fundMe.provider.getBalance(
          deployer,
        )

        //   Act
        const transactionResponse = await fundMe.cheaperWithdraw()
        const transactionReceipt = await transactionResponse.wait(1)
        const { gasUsed, effectiveGasPrice } = transactionReceipt
        const gasCost = gasUsed.mul(effectiveGasPrice)
        const endingFundMeBallance = await fundMe.provider.getBalance(
          fundMe.address,
        )
        const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
        //   Assert
        assert.equal(endingFundMeBallance, 0)
        assert.equal(
          String(startingFundMeBallance.add(startingDeployerBallance)),
          String(endingDeployerBalance.add(gasCost)),
        )
      })
      it('Cheap Allows Us to Withdraw with Multiple Founders', async () => {
        // Arrange
        const accounts = await ethers.getSigners()
        for (let i = 1; i < 7; i++) {
          const fundMeConnectedContract = await fundMe.connect(accounts[i])
          await fundMeConnectedContract.fund({ value: sendValue })
        }
        const startingFundMeBallance = await fundMe.provider.getBalance(
          fundMe.address,
        )
        const startingDeployerBallance = await fundMe.provider.getBalance(
          deployer,
        )
        //   Act
        const transactionResponse = await fundMe.cheaperWithdraw()
        const transactionReceipt = await transactionResponse.wait(1)
        const { gasUsed, effectiveGasPrice } = transactionReceipt
        const gasCost = gasUsed.mul(effectiveGasPrice)
        const endingFundMeBallance = await fundMe.provider.getBalance(
          fundMe.address,
        )
        const endingDeployerBalance = await fundMe.provider.getBalance(deployer)

        // assert
        assert.equal(endingFundMeBallance, 0)
        assert.equal(
          String(startingFundMeBallance.add(startingDeployerBallance)),
          String(endingDeployerBalance.add(gasCost)),
        )
        // assert that we have reseted founders array
        await expect(fundMe.getFunder(0)).to.be.reverted
        for (let i; i < 7; i++) {
          assert.equal(
            await fundMe.getAddressToAmountFunded(accounts[i].address),
            0,
          )
        }
      })
    })
