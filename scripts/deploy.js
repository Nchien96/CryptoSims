const Config = require("./config");
const { ethers, hardhatArguments } = require("hardhat");
async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();

  // // CryptoSimsToken Deploy
  // console.log("deploy from address: ", deployer.address);
  // const sim = await ethers.deployContract("CryptoSims");
  // const tokenAddress = await sim.getAddress();
  // console.log("CryptoSimsToken address:", tokenAddress);
  // Config.setConfig(network + ".SimsToken", tokenAddress);

  // //Vault Deploy
  // console.log("deploy from address: ", deployer.address);
  // const vault = await ethers.deployContract("Vault");
  // const vaultAddress = await vault.getAddress();
  // console.log("Vault Address:", vaultAddress);
  // Config.setConfig(network + ".Vault", vaultAddress);

  // // USDT Deploy
  // console.log("deploy from address: ", deployer.address);
  // const usdt = await ethers.deployContract("USDT");
  // const usdtAddress = await usdt.getAddress();
  // console.log("USDT address:", usdtAddress);
  // Config.setConfig(network + ".USDT", usdtAddress);

  // simsCrowdSale Deploy
  console.log("deploy from address: ", deployer.address);
  const ico = await ethers.deployContract("SIMSCrowdSale", [
    1000,
    100,
    "0x98Adf81933909Cd32fA9E59a8C5bC82E99C5f3e4",
    "0x9Da1b88881A912f27a9A76B0A4361f5a0c6B7f91",
  ]);
  const icoAddress = await ico.getAddress();
  console.log("SIMSCrowdSale address:", icoAddress);
  Config.setConfig(network + ".ICO", icoAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
