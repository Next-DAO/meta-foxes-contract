const fs = require("fs");

const ipfsHash = "QmcA5ahT2bCTNCCXVPgsxhTv8zcHXBfpQfikWxWCadd2eY";
const indexes = [...Array(200).keys()];
const revealedUntil = 190;
const genesisUtil = 90;
const metadataPath = "./metadata/";
const femaleIds = [
  12, 10, 17, 28, 31, 34, 36, 44, 45, 46, 47, 51, 55, 57, 59, 65, 73, 74, 76,
  81, 82, 83, 86, 87, 88, 89, 92, 97, 104, 110, 113, 119, 121, 129, 130, 132,
  137, 138, 144, 155, 167, 168, 172, 184, 190, 195, 196,
];
const desc =
  "Meta Foxes is an NFT collection initiated by the NextDAO community. Every Meta Fox is painstakingly crafted and customized by artists for its owner, without using any artificial intelligence or automation technology. We are committed to using unique designs for each NFT, highlighting its unique story and personality, making it a valuable collectible.";

const stolenIds = [18];
const stolenDesc =
  "DO NOT BUY! THIS TOKEN WAS STOLEN IN A PHISHING ATTACK! IMAGE ALTERED BASED ON https://snapshot.org/#/nextdao.eth/proposal/0xc6aebb10a8036fef00a59305c87f83bcb78d168d26ceec82105f90c2c9b20a5a";

const main = async () => {
  for (const index of indexes) {
    const id = index + 1;
    const urgent =
      id === 192 ||
      id === 193 ||
      id === 194 ||
      id === 195 ||
      id === 196 ||
      id === 199 ||
      id === 200;
    const gender = femaleIds.includes(id) ? "Female" : "Male";

    const _desc = stolenIds.includes(id) ? stolenDesc : desc;
    const _title = stolenIds.includes(id)
      ? `Meta Fox #${id} (STOLEN! DO NOT BUY!)`
      : `Meta Fox #${id}`;

    const image =
      index < revealedUntil || urgent
        ? `ipfs://${ipfsHash}/${id}.png`
        : `ipfs://${ipfsHash}/unrevealed.png`;

    const generation = index < genesisUtil ? "Genesis" : "Gen II";
    const attributes = [{ trait_type: "Generation", value: generation }];

    if (index < revealedUntil || urgent) {
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
