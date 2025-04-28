
let web3;
let contract;
const contractAddress = "0x175aA06A06382034188bC95844762bc840ecB4de";  // Example address
const abi = [
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "getMyPurchase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "getTotalReferredAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "getReferralReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.getElementById("wallet-address").innerText = "Wallet: " + account;
    contract = new web3.eth.Contract(abi, contractAddress);

    const purchase = await contract.methods.getMyPurchase(account).call();
    const referralAmount = await contract.methods.getTotalReferredAmount(account).call();
    const reward = await contract.methods.getReferralReward(account).call();

    document.getElementById("my-purchase").innerText = "$" + web3.utils.fromWei(purchase, "ether");
    document.getElementById("total-ref").innerText = "$" + web3.utils.fromWei(referralAmount, "ether");
    document.getElementById("my-reward").innerText = "$" + web3.utils.fromWei(reward, "ether");

    simulateReferralData();
  } else {
    alert("Please install MetaMask!");
  }
}



let account;

function connectWallet() {
  if (window.ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      account = accounts[0];
      document.getElementById("wallet-address").innerText = "Wallet: " + account;
      const refLink = "https://meverse.one/?ref=" + account;
      document.getElementById("ref-link").value = refLink;
      new QRCode(document.getElementById("qrcode"), {
        text: refLink,
        width: 128,
        height: 128
      });
      simulateReferralData();
    });
  } else {
    alert("Please install MetaMask!");
  }
}

function copyLink() {
  const link = document.getElementById("ref-link");
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}

function simulateReferralData() {
  const count = Math.floor(Math.random() * 25) + 1;
  const reward = count * 10;
  document.getElementById("ref-count").innerText = count;
  document.getElementById("ref-reward").innerText = reward;

  const list = document.getElementById("ref-list");
  list.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const box = document.createElement("div");
    box.className = "ref-box";
    box.innerText = "0x..." + Math.random().toString(16).substr(2, 4).toUpperCase();
    list.appendChild(box);
  }
}
