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

const wallets = [
  "0x0ac1c1c174c0177bd7ec4b1067a2fc4563d39854",
  "0x8295c7d69e1868310acc1b8789094ec7f23a4bb4",
  "0x1B297a4fD9212E8f179c0Dd34330745041D498fF",
  "0x3BA4F680E3ec4C321985c9407F0CE36815DBE192",
  "0x63fb324257b717F6699523EfDBe1DE5a657538C8",
  "0x331E5d9C3F48A73A46aD73C4d998c182A7f461E6",
  "0xD4406A0Fcc23671022d5256D974ac9695AD72724",
  "0x2db35527a753850b4396367a03fA834d13a32F10",
  "0x0843AB4ed4D75F5dCf305fb01f73cF10b0fB278F",
  "0xff7F6a2C575fF6eDa3CAfb29c9eC353a0b3275Fd",
  "0xcfEb8e44ff8fA984fF2a8BEc289C02BA904bb18d",
];

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

  const filename =
    chainENV === "mainnet" ? "signatures" : `${chainENV}_signatures`;

  await fs.writeFile(
    `./data/${filename}.json`,
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
