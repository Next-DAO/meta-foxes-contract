const fs = require("fs");

const indexes = [...Array(43).keys()];
const metadataPath = "./metadata_old/";
const desc = "Connect the dots.";

const main = async () => {
  for (const index of indexes) {
    const metadata = {
      name: `F.O.N DAO (Family of Next) #${index}`,
      description: desc,
      image:
        "ipfs://bafkreiegkzmxpe5mrl5hhg7wlxuxsqs5wsfjl5s762nplnpuzqvbo2rstm",
      attributes: [],
    };

    await fs.writeFileSync(`${metadataPath}${index}`, JSON.stringify(metadata));
  }
};

main();
