const fs = require("fs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { ethers } = require("ethers");
const mainnetABI = require("../abi/mainnet.json");

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
const contractAddress = mainnetABI.contracts.MetaFoxesGenesis.address;

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
  "0x70341b6BfEb170EA9B9F28eaDbE29a610a53b011",
  "0x4839460F05b2a8fC1b615e0523EbC46eFba75420",
  "0xdC97a6c6Fcd0c0D2DB1b099326E9f025F670EC0E",
  "0xd0Ac72d4caBdE2fD41E809a1B6a97e05ACC7Aa69",
  "0xb2d5C1923742114261826dF0bF3e4D6079f5A524",
  "0x47b2101f4c69c5B589811B09e7a483c3A142c512",
  "0xBd0B95DE1439CbbC1945f4F530Fe07B1760FD070",
  "0xbb336D87876101daE751f8C4536033C64cA4257E",
  "0xD9D8Cfb369763CED449a6c81E1D0afFe93dc1FA2",
  "0x667bEdb9211dBE0DD20d4f00B51682be1E3f41ed",
  "0xBfd8cba6a1E10e1Ab4Fa11A0062F4e52e13D260f",
  "0x98be6908c2e88886c137d73b97ffe38a5877cf45",
  "0x2aee1A449FF18A0Be87422dFC9FC09359Cbe47F2",
  "0xf4576977B198A48Ff21dFC67226F9619D1601d84",
  "0x315e63b6bBE140dbcb0d62E7BDD58C3436A671aD",
  "0x4A8392EA3070C331262CF011848fE6c50173743C",
  "0x72c5671Fc7A4e7e4cFCcf63FbF5d87f5C28c1D4A",
  "0xFd19276756130aAabD95DB2545Ac54c65A09B6C4",
  "0x7a755c96CD09D4882D11099e0279EE7bC4183A60",
  "0xb051BcF4085A4Ca6ab838678fCF2B35B4CaF2e7e",
  "0x40e02fC5C442822E6D5f0A075eD4Fd3e50cB2C8b",
  "0x8e6077111c376c468BA57b963fC2F0C31139ac7e",
  "0x7eA83C3093bcbe5b216B291b38E75A3dEb69531c",
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

  await fs.writeFile(
    `./data/signatures.json`,
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
