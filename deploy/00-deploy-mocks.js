const { network } = require("hardhat")
require("dotenv").config()
const {
    developmentChains,
    mocConstructorArgs,
} = require("../helper-hardhat-config")

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    log()
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    if (developmentChains.includes(network.name)) {
        log("Local Network Detected Deploying Mocks")
        log(
            "_________________________________START__________________________________________"
        )
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [
                mocConstructorArgs.DECIMALS,
                mocConstructorArgs.INITIAL_ANSWER,
            ],
        })
        log("Mocks Deployed!")
        log(
            "__________________________________FINISH________________________________________"
        )
    }
}
module.exports.tags = ["all", "mocks"]
