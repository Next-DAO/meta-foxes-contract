const fs = require("fs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { ethers } = require("ethers");
const mainnetABI = require("../abi/mainnet.json");
const goerliABI = require("../abi/goerli.json");

dotenv.config();

if (!process.env.PRIVATE_KEY || !process.env.INFURA_PROJECT_ID) {
  console.error(
    "Please set PRIVATE_KEY and INFURA_PROJECT_ID environment variables."
  );
  process.exit(1);
}

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const signerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const chainENV = process.env.CHAIN_ENV === "goerli" ? "goerli" : "mainnet";
const abi = chainENV === "goerli" ? goerliABI : mainnetABI;
const contractAddress = abi.contracts.MetaFoxesGenesis.address;

const generateToken = async (walletAddress) => {
  // create random salt
  const salt = crypto.randomBytes(16).toString("hex");

  // generate hash based on salt + contract address + user wallet address
  const hash = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["string", "address", "address"],
      [salt, contractAddress.substr(2), walletAddress.substr(2)]
    )
  );

  // sign the hash with signer wallet
  const message = ethers.utils.arrayify(hash);
  const token = await signerWallet.signMessage(message);
  return { salt, token };
};

const wallets = [];

const main = async () => {
  const data = {};

  for (let wallet of wallets) {
    const { salt, token } = await generateToken(wallet);
    console.log("====== Signature ======");
    console.log("Wallet address: ", wallet);
    console.log("Salt: ", salt);
    console.log("Token: ", token);
    data[wallet.toLowerCase()] = { salt, token };
  }

  await fs.writeFile(
    `./data/${chainENV}_signatures.json`,
    JSON.stringify(data, null, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
      process.exit(0);
    }
  );
};

main();
