const Config = require("./config");
const { ethers, hardhatArguments } = require("hardhat");
async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();

  // CryptoSimsToken Deploy
  console.log("deploy from address: ", deployer.address);
  const sim = await ethers.deployContract("CryptoSims");
  const tokenAddress = await sim.getAddress();
  console.log("CryptoSimsToken address:", tokenAddress);
  Config.setConfig(network + ".SimsToken", tokenAddress);

  //Vault Deploy
  console.log("deploy from address: ", deployer.address);
  const vault = await ethers.deployContract("Vault");
  const vaultAddress = await vault.getAddress();
  console.log("Vault Address:", vaultAddress);
  Config.setConfig(network + ".Vault", vaultAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
