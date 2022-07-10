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
    hiddenAddress = currentAccount.substring(0, 5) + "..." + currentAccount.substring(currentAccount.length - 4, currentAccount.length);
    changeAttribute('#wallet-address', 'value', "Account: " + hiddenAddress);
    changeAttribute('#wallet-address', 'visible', "true");
    getBalance();
    //auto detect unit 
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
          changeAttribute('#wallet-address', 'value', "Account: error");
          changeAttribute('#wallet-address', 'visible', "true");
        }
      });
}

function getBalance() {
    ethereum.request({ method: 'eth_getBalance', params: [currentAccount, 'latest'] })
    .then(function(result) {
        accBalance = result;
        console.log(accBalance);
        changeAttribute('#wallet-balance', 'value', "Balance: " + (accBalance / (10 ** 18)).toFixed(4));
        changeAttribute('#wallet-balance', 'visible', "true");
    }
    ).catch(function(err) {
        console.log(err);
        changeAttribute('#wallet-balance', 'value', "Balance: error");
        changeAttribute('#wallet-balance', 'visible', "true");
    });
}

const changeAttribute = (objectID,attribue,value) => {
    $(objectID).setAttribute(attribue, value);
}