const { ethers, getNamedAccounts, network } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const FundMe = await ethers.getContract("FundMe", deployer)
    console.log("______________ withdrawing Contract...__________________")
    const transactionResponse = await FundMe.withdraw()

    await transactionResponse.wait(1)
    console.log("______________ withdrawing Success__________________")
}

main()
    .then(() => process.exit())
    .catch((err) => {
        console.log(err.message)
        process.exit(1)
    })
