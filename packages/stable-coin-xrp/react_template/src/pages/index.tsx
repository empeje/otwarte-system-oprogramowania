import React, { useState } from 'react';

function App() {
  const [signInResponse, setSignInResponse] = useState('');
  const [sessionUserResponse, setSessionUserResponse] = useState('');
  const [signTransactionTxblob, setSignTransactionTxblob] = useState('');
  const [submitTransactionResponse, setSubmitTransactionResponse] = useState('');
  const [txBlob, setTxBlob] = useState('');

  const signIn = async () => {
    // Sign in logic here
  };

  const getUserSession = async () => {
    // Session logic here
  };

  const signTransaction = async () => {
    // Sign transaction logic here
  };

  const submitTransaction = async () => {
    // Submit transaction logic here
  };

  return (
    <div>
      <img alt="Crossmark logo" className="logo" src="./titleblock.png" height="50" style={{position: 'absolute', top: 0, left: 0}}/>
      <div className="wrapper">
        <h1>Developer's Quest</h1>
      </div>

      <main className="main">
        <div>
          <div className="content">
            <button onClick={signIn} className="rounded-button">Sign In and Wait</button>
            <div style={{paddingLeft: '10rem', paddingTop: '5rem'}}></div>
            <textarea style={{width: '75%', height: '10rem'}} id="response1" readOnly value={signInResponse}></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={getUserSession} className="rounded-button">Get Session</button>
            <div style={{paddingLeft: '11rem', paddingTop: '5rem'}}></div>
            <textarea style={{width: '75%', height: '10rem'}} id="response2" readOnly value={`Current User: ${sessionUserResponse}`}></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={signTransaction} className="rounded-button">Sign Transaction</button>
            <div style={{paddingLeft: '10rem', paddingTop: '5rem'}}></div>
            <textarea style={{width: '75%', height: '10rem'}} id="response3" value={`TxBlob: ${signTransactionTxblob}`}></textarea>
          </div>
          <div className="divider"></div>
          <div className="content">
            <button onClick={submitTransaction} className="rounded-button">Submit Transaction</button>
            <div style={{paddingLeft: '10rem', paddingTop: '5rem'}}></div>
            <textarea style={{width: '75%', height: '10rem'}} id="response4" value={submitTransactionResponse} onChange={(e) => setTxBlob(e.target.value)}></textarea>
          </div>
          <div className="divider"></div>
        </div>
      </main>
    </div>
  );
}

export default App;