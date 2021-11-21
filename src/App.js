import "./App.css";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import memetokenSaleabi from "./utils/SendMemeTokenSale.json";
import memetokenabi from "./utils/SendMeme.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [amountToBuy, setAmountToBuy] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [tokenSold, setTokenSold] = useState(0);
  const [loading, setLoading] = useState(false);

  const [balanceOfAccount, setBalanceOFAccount] = useState(0);

  const [tokenPrice1, setTokenPrice] = useState(0);

  const MemeTokenSaleAddress = "0xE541bE15C8Ea9aCbDF15618f12fb53d597269DFc";
  const MemeTokenSaleABI = memetokenSaleabi.abi;


  const MemeTokenAddress = "0xfEce60C1ecFc371f6582F781227cdFdc1F7D9740";
  const MemeTokenABI = memetokenabi.abi;



  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = async (accounts) => {
    try {
      const { ethereum } = window;
      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(MemeTokenSaleAddress, MemeTokenSaleABI, signer);
        
        const priceOfToken = await wavePortalContract.tokenPrice();
        const priceOfTokenToNumber = ethers.utils.formatEther(priceOfToken);
        setTokenPrice(priceOfTokenToNumber);
        
        
        const amountOfTokenSold = await wavePortalContract.tokensSold();
        const getAmountOfTokenSold = await amountOfTokenSold.toNumber()
        setTokenSold(getAmountOfTokenSold);
        
        const SendMemeContract = new ethers.Contract(MemeTokenAddress, MemeTokenABI, signer);
        if(currentAccount !== "") {
          const balanceofToken = await SendMemeContract.balanceOf(accounts);
          const getbalanceofToken = await balanceofToken.toNumber();
          setBalanceOFAccount(getbalanceofToken);
          console.log(getbalanceofToken);
        }
         
        
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const buyToken = async (e) => {
    try {
      e.preventDefault();
      const { ethereum } = window;
      if (ethereum) {
     
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        
        const wavePortalContract = new ethers.Contract(MemeTokenSaleAddress, MemeTokenSaleABI, signer);
        
        await wavePortalContract.buyTokens(amountToBuy);
        
        
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
  const checkIfWalletIsConnected = async (youknowaccounts) => {
    try {
      setLoading(true);

      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getDetails(youknowaccounts);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
    checkIfWalletIsConnected(currentAccount);
  }, [currentAccount]);

  return (
    <div className="container" style={{ width: "650px" }}>
      {loading && <div>Loading...</div>}
      <div className="row">
        <div className="col-lg-12">
          <h1 className="text-center">Meme Token</h1>
          <hr />
          <br />
        </div>
        <div className="text-center">
          <p>
            Introducing "Blunt Token"! Token price is 
            <span className="token-price"> {tokenPrice1} </span>Ether. You currently have {balanceOfAccount}
            <span></span> Meme
          </p>
          <br />
          <form onSubmit={buyToken}>
            <div className="form-group">
              <div className="input-group">
                <input
                  className="form-control input-lg"
                  type="text"
                  onChange={(event) => setAmountToBuy(event.currentTarget.value)}
                  value={amountToBuy}
                />

                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Buy Tokens
                  </button>
                </span>
              </div>
            </div>
          </form>
          <br />
          <div className="progress">
            <div
              id="progress"
              className="progress-bar progress-bar-striped active"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p>
            <span className="tokens-sold">{tokenSold}</span> / 750000
            <span className="tokens-available"></span> tokens sold
          </p>
          <hr />
          <p id="accountAddress">{currentAccount}</p>
            {!currentAccount && <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
            </button>}
            {/* <button className="waveButton" onClick={getDetails}>
              GetDetails
            </button> */}
         
        </div>
      </div>
    </div>
  );
}

export default App;
