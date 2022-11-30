const { run } = require("hardhat")
const verify = async (contractAddress, args) => {
    console.log("Verifying Contract", args)
    try {
        await run("verify", {
            address: contractAddress,
            args: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(error)
        }
    }
}
module.exports = { verify }
