const fs = require("fs");

const ipfsHash = "QmTG9dFydfTnphh9PgcbPjhuYXdLCJPaPh2SScQ5Gg2WtQ";
const indexes = [...Array(500).keys()];
const revealedUntil = 147;
const genesisUtil = 90;
const metadataPath = "./metadata/";
const femaleIds = [
  12, 10, 17, 28, 34, 36, 44, 45, 46, 47, 51, 55, 57, 59, 65, 73, 74, 76, 81,
  82, 83, 86, 87, 88, 89, 92, 97, 104, 110, 113, 119, 121, 129, 130, 132, 137,
  138, 144,
];
const desc =
  "Meta Foxes is an NFT collection initiated by the NextDAO community. Every Meta Fox is painstakingly crafted and customized by artists for its owner, without using any artificial intelligence or automation technology. We are committed to using unique designs for each NFT, highlighting its unique story and personality, making it a valuable collectible.";

const stolenIds = [18];
const stolenDesc =
  "DO NOT BUY! THIS TOKEN WAS STOLEN IN A PHISHING ATTACK! IMAGE ALTERED BASED ON https://snapshot.org/#/nextdao.eth/proposal/0xc6aebb10a8036fef00a59305c87f83bcb78d168d26ceec82105f90c2c9b20a5a";

const main = async () => {
  for (const index of indexes) {
    const id = index + 1;
    const gender = femaleIds.includes(id) ? "Female" : "Male";

    const _desc = stolenIds.includes(id) ? stolenDesc : desc;
    const _title = stolenIds.includes(id)
      ? `Meta Fox #${id} (STOLEN! DO NOT BUY!)`
      : `Meta Fox #${id}`;

    const image =
      index < revealedUntil || id === 164 || id === 156
        ? `ipfs://${ipfsHash}/${id}.png`
        : `ipfs://${ipfsHash}/unrevealed.png`;

    const generation = index < genesisUtil ? "Genesis" : "Gen II";
    const attributes = [{ trait_type: "Generation", value: generation }];

    if (index < revealedUntil || id === 164 || id === 156) {
      attributes.push({ trait_type: "Gender", value: gender });
    }

    const metadata = {
      name: _title,
      description: _desc,
      image,
      attributes,
    };

    await fs.writeFileSync(`${metadataPath}${id}`, JSON.stringify(metadata));
  }
};

main();
