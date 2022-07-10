var account = null;
let currentAccount = null
$ = (queryString) => document.querySelector(queryString);

//anonymous async function to initialize await values
(async () => {
	//connectWallet function to connect wallet and get account address
	$('#connectButton').addEventListener('click', function (evt) {
        connectWallet();
      });
})();

ethereum.on('chainChanged', (_chainId) => window.location.reload());

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    accBalance = web3.eth.getBalance(currentAccount);
    hiddenAddress = currentAccount.substring(0, 5) + "..." + currentAccount.substring(currentAccount.length - 4, currentAccount.length);
    changeAttribute('#wallet-address', 'value', "Account: " + hiddenAddress);
    changeAttribute('#wallet-balance', 'value', "Balance: " + (accBalance / (10 ** 18)).toFixed(4));
  }
}

function connectWallet() {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
}

const changeAttribute = (objectID,attribue,value) => {
    $(objectID).setAttribute(attribue, value);
}