const fs = require("fs");

const ipfsHash = "QmbrNXCeQKpP1ue5kQTGW1tGuSgaJ9HjmGZjiD9BsSdfG2";
const indexes = [...Array(81).keys()];
const metadataPath = "./metadata/";
const femaleIds = [
  2, 12, 10, 17, 28, 34, 36, 44, 45, 46, 47, 51, 55, 57, 59, 65, 73, 74, 76, 81,
];
const desc =
  "Meta Foxes Genesis is a collection of handmade NFTs. Specially customized for the original NextDAO early supporters.";

const stolenIds = [18];
const stolenDesc = "DO NOT BUY! THIS TOKEN WAS STOLEN IN A PHISHING ATTACK!";

const main = async () => {
  for (const index of indexes) {
    const id = index + 1;
    const gender = femaleIds.includes(id) ? "Female" : "Male";

    const _desc = stolenIds.includes(id) ? stolenDesc : desc;
    const _title = stolenIds.includes(id)
      ? `Meta Fox #${id} (STOLEN! DO NOT BUY!)`
      : `Meta Fox #${id}`;

    const metadata = {
      name: _title,
      description: _desc,
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
