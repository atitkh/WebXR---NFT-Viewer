var account = null;
let currentAccount = null
$ = (queryString) => document.querySelector(queryString);
const scene = $('#mainScene');
// import env variables from .env file
require('dotenv').config();

//anonymous async function to initialize await values
(async () => {
	//connectWallet function to connect wallet and get account address
  $('#connectButton').addEventListener('click', function (evt) {
        connectWallet();
        addImages(10);
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
    changeAttribute('#connectButton','visible', 'false');
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

function addImages(count){
    for(let i = 0; i < count; i++){
        let image = document.createElement('a-image');
        // image.setAttribute('id', 'image' + i);
        image.setAttribute('src', 'assets/vs-bot.png');
        //variabe positions around the camera in a circle
        let x = Math.cos(i * (2 * Math.PI / count)) * 5;
        let y = 2
        let z = Math.sin(i * (2 * Math.PI / count)) * 5;
        let position = x + " " + y + " " + z;
        image.setAttribute('position', position);
        image.setAttribute('look-at', '#camera');
        scene.appendChild(image);
    }
}

function getNFTs(){
  data = {
    'address': currentAccount,
    'auth': akapi_key
  };
  console.log(data);
  // $.ajax({
  //   type: "POST",
  //   url: "/NFTPortal",
  //   contentType: 'application/json;charset=UTF-8',
  //   data: JSON.stringify(data),
  //   success: function (response) {
  //     console.log(response);
  //     $("#table").empty();
  //     //display the data in table
  //     $("#table").append("<tr><th>ID</th><th>NFT Name</th><th>Blockchain</th><th>Description</th><th>NFT Image</th></tr>");
  //     for (var i = 2; i < response.length; i++) {
  //       if(response[i].error){
  //         $("#error").empty();
  //         $("#error").append("<p>" + response[i].error + "</p>");
  //       }
  //       if(response[i] == ""){
  //         response[i].name = "N/A";
  //         response[i].chain = "N/A";
  //         response[i].description = "N/A";
  //         response[i].img = "N/A";
  //       }
  //       $("#table").append("<tr><td>" + i + "</td><td>" 
  //         + response[i].name + "</td><td>" 
  //           + response[i].chain + "</td><td>" 
  //             + response[i].description + "</td><td><img src='" 
  //             + response[i].img + "'width=auto height='350'></td></tr>");
  //     }
  //   },
  //   error: function (response) {
  //     console.log(response);
  //     $("#error").empty();
  //     $("#error").append("<p>An Error Occured</p>");
  //   }
  // });
}

const changeAttribute = (objectID,attribue,value) => {
    $(objectID).setAttribute(attribue, value);
}