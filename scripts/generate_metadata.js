const fs = require("fs");

const ipfsHash = "Qmf8QfvudjKGVWCX6C3HeiSr5usqcbVmJy21gevXaKvzn8";
const indexes = [...Array(73).keys()];
const metadataPath = "./metadata/";
const femaleIds = [
  2, 12, 10, 17, 28, 34, 36, 44, 45, 46, 47, 51, 55, 57, 59, 65, 73,
];
const desc =
  "Meta Foxes Genesis is a collection of handmade NFTs. Specially customized for the original NextDAO early supporters.";

const main = async () => {
  for (const index of indexes) {
    const id = index + 1;
    const gender = femaleIds.includes(id) ? "Female" : "Male";
    const metadata = {
      name: `Meta Fox #${id}`,
      description: desc,
      image: `ipfs://${ipfsHash}/${id}.png`,
      attributes: [
        { trait_type: "Generation", value: "Genesis" },
        { trait_type: "Gender", value: gender },
      ],
    };

    await fs.writeFileSync(`${metadataPath}${id}`, JSON.stringify(metadata));
  }
};

main();
