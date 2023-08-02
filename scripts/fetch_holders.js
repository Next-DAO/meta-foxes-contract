const web3 = require("web3");
const axios = require("axios");
const dotenv = require("dotenv");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

dotenv.config();

const csvWriter = createCsvWriter({
  path: "holders.csv",
  header: [{ id: "address", title: "Address" }],
});

const main = async () => {
  const pageSize = 500;
  const blockNumber = 17825874;
  const apiKey = process.env.COVALENTHQ_API_KEY;
  const contractAddress = "0xc599f72644140fe4d00ef9574100f636a30d923d";
  const hackersAddress = ["0x7a408302B99388c76CA7aFBCC52935ED04484f81"];

  const url = `https://api.covalenthq.com/v1/1/tokens/${contractAddress}/token_holders/?format=JSON&block-height=${blockNumber}&page-size=${pageSize}&key=${apiKey}`;
  console.log(`Fetching ${url}...`);
  const res = await axios.get(url);

  const result = res.data.data.items
    .map((i) => {
      return {
        address: web3.utils.toChecksumAddress(i.address),
      };
    })
    .filter((i) => !hackersAddress.includes(i.address));

  await csvWriter.writeRecords(result);
};

main();
