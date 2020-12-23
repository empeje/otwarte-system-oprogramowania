import React, { useState } from "react";
import { Button, Modal, Divider } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";

// added display of 0 if price={price} is not provided

/*
  ~ What it does? ~

  Displays current ETH price and gives options to buy ETH through Wyre/Ramp/Coinbase
                            or get through Rinkeby/Ropsten/Kovan/Goerli

  ~ How can I use? ~

  <Ramp 
    price={price} 
    address={address}
  />

  ~ Features ~

  - Ramp opens directly in the application, component uses RampInstantSDK
  - Provide price={price} and current ETH price will be displayed
  - Provide address={address} and your address will be pasted into Wyre/Ramp instantly
*/

export default function Ramp(props) {
  const [modalUp, setModalUp] = useState("down");

  const type = "default";

  return (
    <div>
      <Button
        size="large"
        shape="round"
        onClick={() => {
          setModalUp("up");
        }}
      >
        <DollarCircleOutlined style={{ color: "#52c41a" }} /> {typeof props.price == "undefined" ? 0 : props.price.toFixed(2)}
      </Button>
      <Modal
        title="Buy ETH"
        visible={modalUp === "up"}
        onCancel={() => {
          setModalUp("down");
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalUp("down");
            }}
          >
            cancel
          </Button>,
        ]}
      >
        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://pay.sendwyre.com/purchase?destCurrency=ETH&sourceAmount=25&dest=" + props.address);
            }}
          >
            <span style={{ paddingRight: 15 }} role="img">
              <span role="img" aria-label="flag-us">🇺🇸</span>
            </span>
            Wyre
          </Button>
        </p>
        <p>
          {" "}
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              new RampInstantSDK({
                hostAppName: "scaffold-eth",
                hostLogoUrl: "https://scaffoldeth.io/scaffold-eth.png",
                swapAmount: "100000000000000000", // 0.1 ETH in wei  ?
                swapAsset: "ETH",
                userAddress: props.address,
              })
                .on("*", event => console.log(event))
                .show();
            }}
          >
            <span style={{ paddingRight: 15 }} role="img">
            <span role="img" aria-label="flag-gb">🇬🇧</span>
            </span>
            Ramp
          </Button>
        </p>

        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://www.coinbase.com/buy-ethereum");
            }}
          >
            <span style={{ paddingRight: 15 }} role="img" aria-label="bank">
              🏦
            </span>
            Coinbase
          </Button>
        </p>

        <Divider />

        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://faucet.rinkeby.io/");
            }}
          >
            <span style={{ paddingRight: 15 }} role="img" aria-label="rinkeby">
              🟨
            </span>{" "}
            Rinkeby
          </Button>
        </p>

        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://faucet.ropsten.be/");
            }}
          >
            <span style={{ paddingRight: 15 }} role="img" aria-label="ropsten">
              🟠
            </span>{" "}
            Ropsten
          </Button>
        </p>

        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://faucet.kovan.network/");
            }}
          >
            <span style={{ paddingRight: 15 }} role="img" aria-label="kovan">
              🟣
            </span>{" "}
            Kovan
          </Button>
        </p>

        <p>
          <Button
            type={type}
            size="large"
            shape="round"
            onClick={() => {
              window.open("https://faucet.goerli.mudit.blog/");
            }}
          >
            <span style={{ paddingRight: 15 }} role="img" aria-label="goerli">
              🔵
            </span>{" "}
            Goerli
          </Button>
        </p>
      </Modal>
    </div>
  );
}
