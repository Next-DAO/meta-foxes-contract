module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const initBaseURL = "ipfs://QmTkgVTLcqU8R5jJg6NuU5MwupmiWcyESMDsDsrwkMKR4M/";

  await deploy("MetaFoxesGenesis", {
    from: deployer,
    args: [deployer, 43, 1, initBaseURL],
    log: true,
  });
};

module.exports.tags = ["MetaFoxesGenesis"];
