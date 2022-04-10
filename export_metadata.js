const fs = require("fs");

const indexes = [...Array(34).keys()];
const metadataPath = "./metadata/";
const desc =
  "Meta Foxes Genesis is a collection of handmade NFTs. Specially customized for the original NextDAO early supporters.";

const main = async () => {
  for (const index of indexes) {
    const metadata = {
      name: `Meta Fox #${index + 1}`,
      description: desc,
      image: `ipfs://QmfMJ3B7bbqxtAnbCRH6iMv4nUCRM1awHVWQXmT4guc3Mq/${
        index + 1
      }.png`,
      attributes: [{ trait_type: "Generation", value: "Genesis" }],
    };

    await fs.writeFileSync(
      `${metadataPath}${index + 1}`,
      JSON.stringify(metadata)
    );
  }
};

main();
