currentAccount = null;
mode = "non-vr";
address = null;

$ = (queryString) => document.querySelector(queryString);
const scene = $('#mainScene');

//anonymous async function to initialize await values
(async () => {
	//connectWallet function to connect wallet and get account address

  $('#connectButton').addEventListener('click', async () => {
    connectWallet();
    // addImages(nftArray.length, nftArray);
  });
  $('#nftButton').addEventListener('click', async () => {
    //remove button
    removeButtonClick('nft');
    getNFTs(currentAccount);
  });
})();

// check if mode is VR or not
scene.addEventListener('enter-vr', function () {
  console.log("ENTERED VR");
  mode = "vr";

  removeButtonClick('nft');
  removeButtonClick('connect');
  $('#non-vr-entity').setAttribute('visible', 'false');

  addButtonClick('nftVR');
  addButtonClick('clipboard');
  $('#vr-entity').setAttribute('visible', 'true');

  $('#nftVRButton').addEventListener('click', async () => {
    //remove button
    // address = $('#addressInput').getAttribute('value');
    address = $('#addressInput').getAttribute('value');
    changeAttribute('#addressInput', 'visible', "false");
    removeButtonClick('nftVR');
    removeButtonClick('clipboard');
    changeAttribute('#wallet-address', 'value', "Account: " + address);
    changeAttribute('#wallet-address', 'visible', "true");
    // removeButtonClick('nftVR');
    $('#keyboard').setAttribute('super-keyboard', {show: false});
    getNFTs(address);
  });

  $('#clipboardButton').addEventListener('click', async () => {
    //remove button
    // address = $('#addressInput').getAttribute('value');
    address = await navigator.clipboard.readText();
    changeAttribute('#addressInput', 'value', address);
  });
});

scene.addEventListener('exit-vr', function () {
  console.log("EXITED VR");
  mode = "non-vr";

  removeButtonClick('nft');
  removeButtonClick('nftVR');
  removeButtonClick('clipboard');
  $('#vr-entity').setAttribute('visible', 'false');

  addButtonClick('connect');
  $('#non-vr-entity').setAttribute('visible', 'true');
});
//

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
    removeButtonClick('connect');
    addButtonClick('nft');
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
        changeAttribute('#wallet-balance', 'value', "Balance: " + (accBalance / (10 ** 18)).toFixed(4));
        changeAttribute('#wallet-balance', 'visible', "true");
    }
    ).catch(function(err) {
        console.log(err);
        changeAttribute('#wallet-balance', 'value', "Balance: error");
        changeAttribute('#wallet-balance', 'visible', "true");
    });
}

function addImages(count, nftArray){
  if (count > 0) {
    let rows = count/10;
    let column = 10;
    if(count < 10){
      column = count;
    }
    let y = 2;
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < column; j++){
        $('#no-nfts').setAttribute('visible', 'false');
        console.log("adding image " + ((i*10)+j));
        let image = document.createElement('a-image');
        image.setAttribute('id', 'nftImage' + (i*10)+j);
        image.setAttribute('src', 'https://arjs-cors-proxy.herokuapp.com/'+nftArray[((i*10)+j)].file_url);
        let x = Math.cos(((i*10)+j) * (2 * Math.PI / column)) * 6;
        let z = Math.sin(((i*10)+j) * (2 * Math.PI / column)) * 6;
        var position = x + " " + y + " " + z;
        image.setAttribute('position', position);
        image.setAttribute('scale', '2 2 2');
        image.setAttribute('look-at', '#camera');
        scene.appendChild(image);
      }
      y = y + 3;
    }
  }
  else{
    console.log("No NFTs found");
    $('#no-nfts').setAttribute('visible', 'true');
  }
}

// add names to images
function addNames(count, nftArray){
  if (count > 0) {
    let rows = count/10;
    let column = 10;
    if(count < 10){
      column = count;
    }
    let y = 0.75;
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < column; j++){
        $('#no-nfts').setAttribute('visible', 'false');
        console.log("adding name " + ((i*10)+j));
        let name = document.createElement('a-text');
        name.setAttribute('id', 'nftName' + ((i*10)+j));
        name.setAttribute('value', nftArray[((i*10)+j)].name);
        //variabe positions around the camera in a circle
        let x = Math.cos(((i*10)+j) * (2 * Math.PI / column)) * 6;
        let z = Math.sin(((i*10)+j) * (2 * Math.PI / column)) * 6;
        var position = x + " " + y + " " + z;
        name.setAttribute('position', position);
        name.setAttribute('align', 'center');
        name.setAttribute('scale', '0.5 0.5 0.5');
        name.setAttribute('look-at', '#camera');
        scene.appendChild(name);
      }
      y = y + 3;
    }
  }
  else{
    console.log("No NFTs found");
    $('#no-nfts').setAttribute('visible', 'true');
  }
}

async function getNFTs(address){
  if(address !== null){
    console.log("Account connected");
    console.log("Getting NFTs for " + address);
    var nftArray = [];
    // post req to NFT API 
    fetch(`https://api.atitkharel.com.np/nft/all?address=${address}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())  // convert to json
    .then(async (json) => {
      for (let i = 0; i < (json.length - 1); i++) {
        if (json[i].file_url != '') {
          nftArray.push(json[i]);
        }
      }
      // console.log(nftArray);
      addImages(nftArray.length, nftArray);
      addNames(nftArray.length, nftArray);
    })    //print data to console
    .catch(err => console.log('Request Failed', err));
    return nftArray;
  }
  else{
    console.log("No account connected");
  }
}

const changeAttribute = (objectID,attribue,value) => {
    $(objectID).setAttribute(attribue, value);
}

const removeButtonClick = (name) => {
  console.log("removing " + name);
  $('#'+name+'Button').classList.remove('clickable');
  $('#'+name+'Button').setAttribute('visible', 'false');
  if(name === 'nft'){ name = 'nftb'; }
  $('#'+name+'Box').classList.remove('clickable');
  $('#'+name+'Text').classList.remove('clickable');
}

const addButtonClick = (name) => {
  console.log("adding " + name);
  $('#'+name+'Button').setAttribute('visible', 'true');
  $('#'+name+'Button').classList.add('clickable');
  if(name === 'nft'){ name = 'nftb'; }
  $('#'+name+'Box').classList.add('clickable');
  $('#'+name+'Text').classList.add('clickable');
}