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
  "0x2ddfbe5f42345bedfc65a628331b7b2fdbf55569",
  "0x445769dA41AEf8D87E392f55bDDaDbDDd6757ce5",
  "0x9ED711c945a9da838DD485aA7B1c810e01e9f722",
  "0x6B52253F206565e50693FD332B024a2D5e3742Bc",
  "0x3EF36dC4fb0efc04c7174cc11dF8872aFcE8bE52",
  "0xc7bca24d165dcc84f18d77f1fb1f4bbdd78074ce",
  "0x745fe12915D8A89037dBBB6b1fd2d0482E0B8572",
  "0x873617668d1E569028823b017A3a3CbC9518A602",
  "0x41a5365fd757f7f7a10ae1137a532b72d0f72b2a",
  "0xE62969137E7043E56c0d88b887C6A8D3C4FD888d",
  "0x673D83730c9c52C2DBE95556050F4bd7c5283c0B",
  "0x24CFBfb2a9B85F2fe5dBf2318B5A12140bEcC8d5",
  "0xEA87C49d2FE5E7D4b448f9e04c72D13E242142EC",
  "0xAB87Eb50280a340b42F4eaB31db90714B39fe687",
  "0xbb908bf5FC1b148FCCdc825e3e3095997CCe4faa",
  "0xD480E91db69F946B5EE5788a52181F3cf0De1B79",
  "0x3d6ab0e51064076a919e1bda6a596ce93f5b9d15",
  "0x32b87cfff2f4843b7b9ec60ae0b5d014f975331a",
  "0x7C398823a0F77489418f6190237dfbeb16526B81",
  "0x853707e7602c462916176f79b19f6a53505fb439",
  "0x3F10b7FCB49A3f16e95F2e3aaE8c11114f8BD8AE",
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
