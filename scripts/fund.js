const { ethers, getNamedAccounts, network } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const FundMe = await ethers.getContract("FundMe", deployer)
    console.log("__________________Funding Contract...__________________")
    const transactionResponse = await FundMe.fund({
        value: ethers.utils.parseEther("0.2"),
    })
    await transactionResponse.wait(1)
    console.log("______________________Funded___________________________")
}

main()
    .then(() => process.exit())
    .catch((err) => {
        console.log(err.message)
        process.exit(1)
    })
