module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const initBaseURL = "ipfs://QmWWrqG39GkwZC4R7iEUGKoRH3EhrNuVd4t4nBNs8rNhyd/";

  await deploy("MetaFoxesGenesis", {
    from: deployer,
    args: [deployer, 500, 1, initBaseURL],
    log: true,
  });
};

module.exports.tags = ["MetaFoxesGenesis"];
