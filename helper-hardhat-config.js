const networkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xd4a33860578de61dbabdc8bfdb98fd742fa7028e",
    },

    137: {
        name: "poligon",
        ethUsdPriceFeed: "0xf9680d99d6c9589e2a93a78a04a279e509205945",
    },
}
const developmentChains = ["hardhat", "localhost"]

const mocConstructorArgs = {
    DECIMALS: 8,
    INITIAL_ANSWER: 325200000000,
}

module.exports = {
    developmentChains,
    networkConfig,
    mocConstructorArgs,
}
//
// 420: {
//   name: 'goerli',
//   ethUsdPriceFeed: '0xd4a33860578de61dbabdc8bfdb98fd742fa7028e',
// },
