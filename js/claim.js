document.addEventListener("DOMContentLoaded", () => {
  let web3;
  let contract;
  let currentAccount = "";

  const contractAddress = "0x175aA06A06382034188bC95844762bc840ecB4de";
  const abi = [
    { "inputs": [{"internalType": "address","name": "user","type": "address"}], "name": "getMyPurchase", "outputs": [{"internalType": "uint256","name":"","type":"uint256"}], "stateMutability": "view", "type": "function" },
    { "inputs": [{"internalType": "address","name": "user","type": "address"}], "name": "getStakingReward", "outputs": [{"internalType": "uint256","name":"","type":"uint256"}], "stateMutability": "view", "type": "function" },
    { "inputs": [{"internalType": "address","name": "user","type": "address"}], "name": "getReferralReward", "outputs": [{"internalType": "uint256","name":"","type":"uint256"}], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "claimTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "claimStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "claimReferralReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
  ];

  async function initWeb3() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      currentAccount = accounts[0];
      document.getElementById("wallet-address").innerText = currentAccount;
      contract = new web3.eth.Contract(abi, contractAddress);
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function loadInfo() {
    if (!currentAccount || !web3.utils.isAddress(currentAccount)) return;
    const presale = await contract.methods.getMyPurchase(currentAccount).call();
    const staking = await contract.methods.getStakingReward(currentAccount).call();
    const referral = await contract.methods.getReferralReward(currentAccount).call();
    document.getElementById("presale").innerText = web3.utils.fromWei(presale, "ether");
    document.getElementById("staking").innerText = web3.utils.fromWei(staking, "ether");
    document.getElementById("referral").innerText = web3.utils.fromWei(referral, "ether");
  }

  window.connectAndLoad = async function () {
    await initWeb3();
    await loadInfo();
  };

  window.claim = async function (type) {
    if (!currentAccount) return;
    const methods = {
      presale: "claimTokens",
      staking: "claimStaking",
      referral: "claimReferralReward"
    };
    await contract.methods[methods[type]]().send({ from: currentAccount });
    alert("✅ Claimed " + type + " reward!");
  };
});