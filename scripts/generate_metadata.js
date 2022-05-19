const fs = require("fs");

const indexes = [...Array(57).keys()];
const metadataPath = "./metadata/";
const imageBaseURI = "ipfs://QmVx9Q7dxwgxNBevfLauZhQX13oAbLet374dBw4nHq5KKF/";
const desc =
  "Meta Foxes Genesis is a collection of handmade NFTs. Specially customized for the original NextDAO early supporters.";
const femaleIds = [2, 10, 12, 17, 28, 34, 36, 44, 45, 46, 47, 51, 55, 57];

const getGender = (tokenId) => {
  return femaleIds.includes(tokenId) ? "Female" : "Male";
};

const main = async () => {
  for (const index of indexes) {
    const metadata = {
      name: `Meta Fox #${index + 1}`,
      description: desc,
      image: `${imageBaseURI}${index + 1}.png`,
      attributes: [
        { trait_type: "Generation", value: "Genesis" },
        { trait_type: "Gender", value: getGender(index + 1) },
      ],
    };

    await fs.writeFileSync(
      `${metadataPath}${index + 1}`,
      JSON.stringify(metadata)
    );
  }
};

main();
