
let web3;
let contract;
let userAccount;

const contractAddress = "0x175aA06A06382034188bC95844762bc840ecB4de";
const abi = [
  {
    "inputs": [],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    userAccount = accounts[0];
    document.getElementById("wallet-address").innerText = "Wallet: " + userAccount;
    contract = new web3.eth.Contract(abi, contractAddress);
  } else {
    alert("Please install MetaMask.");
  }
}

async function buyTokens() {
  const amount = document.getElementById("amount").value;
  if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const value = web3.utils.toWei(amount, "ether");
  try {
    await contract.methods.buy().send({ from: userAccount, value: value });
    document.getElementById("status").innerText = "✅ Purchase successful!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Purchase failed.";
  }
}
