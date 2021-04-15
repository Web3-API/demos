import './App.css';
import React from 'react';
import Lottie from "react-lottie";
import { Web3ApiClient } from "@web3api/client-js";

import { setupWeb3ApiClient } from "./web3api/setupClient";
import {
  setData,
  deployContract
} from "./web3api/simplestorage";
import Web3ApiAnimation from "./lottie/Web3API_Icon_Cycle.json";

interface Set {
  txReceipt: string;
  value: number;
}

function App() {
  const [client, setClient] = React.useState<Web3ApiClient | undefined>(undefined);
  const [contract, setContract] = React.useState<string | undefined>(undefined);
  const [value, setValue] = React.useState<number>(0);
  const [sets, setSets] = React.useState<Set[]>([]);
  const addSet = (set: Set) => setSets([...sets, set]);

  const [inputValue, setInputValue] = React.useState<number>(0);

  const getClient = async () => {
    if (client) {
      return client;
    }

    const newClient = await setupWeb3ApiClient();
    setClient(newClient);
    return newClient;
  }

  const logoLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: Web3ApiAnimation
  };

  const tab = () => (<>&nbsp;&nbsp;&nbsp;&nbsp;</>);

  const link = (url: string, children: () => JSX.Element) => (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {children()}
    </a>
  );

  const emoji = (symbol: string) => (
    <span role="img" aria-label={symbol}>
      {symbol}
    </span>
  );

  const codeSyntax = (type: string) => (
    (children: () => JSX.Element) => (
      <text className={type}>{children()}</text>
    )
  )

  const syntax = {
    class: codeSyntax("Code-Class"),
    prop: codeSyntax("Code-Prop"),
    value: codeSyntax("Code-Value"),
    string: codeSyntax("Code-String"),
    variable: codeSyntax("Code-Variable")
  };

  return (
    <div className="App">
      <div className="nav">
        {link(
          "https://github.com/Web3-API/specification/blob/main/spec/intro/1_Introduction.md#impact",
          () => (
            <>Why Web3API</>
          )
        )}
      </div>
      <header className="App-body">
        {link("https://web3api.dev/", () => (
          <Lottie
            options={logoLottieOptions}
            isClickToPauseDisabled={true}
            height={"100px"}
            width={"100px"}
          />
        ))}
        Pre-Alpha
          <h3>
            Web3API Demo:
            <br/>
            {link("https://app.ens.domains/name/api.simplestorage.eth", () => (
              <>api.simplestorage.eth</>
            ))}
            &nbsp;->&nbsp;
            {link("https://bafybeihsk2ivvcrye7bqtdukxjtmfevfxgidebqqopoqdfpucbgzyy2edu.ipfs.dweb.link/", () => (
              <>IPFS</>
            ))}
          </h3>
          <br/>
          <br/>
        {!contract ?
          <>
            Let's get started...<br/><br/>
            {emoji("🔌")} Set Metamask to Rinkeby<br/>
            <button onClick={async () =>
              deployContract(
                await getClient()
              ).then(address =>
                setContract(address)
              ).catch(err =>
                console.error(err)
              )
            }>
              {emoji("🚀")} Deploy SimpleStorage.sol
            </button>
            <div className="Code-Block">
              {syntax.class(() => <>Web3Api</>)}.
              {syntax.prop(() => <>query</>)}
              {"({"}<br/>
              {syntax.value(() => <>&nbsp;&nbsp;&nbsp;&nbsp;uri: </>)}
              {syntax.string(() => <>"w3://ens/rinkeby/api.simplestorage.eth"</>)},<br/>
              {syntax.value(() => <>&nbsp;&nbsp;&nbsp;&nbsp;query: </>)}
              {syntax.string(() => <>{"`mutation {"}</>)}<br/>
              {syntax.string(() => <>{tab()}{tab()}{"deployContract("}</>)}<br/>
              {syntax.string(() => <>
                {tab()}{tab()}{tab()}{"connection: {"}<br/>
                {syntax.string(() => <>
                  {tab()}{tab()}{tab()}{tab()}{"networkNameOrChainId: "}{syntax.variable(() => <>
                    {"\"rinkeby\""}
                  </>)}<br/>
                  {tab()}{tab()}{tab()}{"}"}<br/>
                </>)}
              </>)}
              {syntax.string(() => <>
                {tab()}{tab()}{")"}
              </>)}<br/>
              {syntax.string(() => <>
                {tab()}{"}`"}
              </>)}<br/>
              {"})"}
            </div>
            <br/>
          </> :
          <>
            <p>
              {emoji("✔️")} Deployed SimpleStorage ({link(`https://rinkeby.etherscan.io/address/${contract}`, () => (
                <>{contract.substr(0, 7)}...</>
              ))})
            </p>
            <br/>
          </>
        }
        {contract &&
        <>
          Storage Value: {value}<br/>
          <input
            type="number"
            min="0"
            value={inputValue}
            style={{ width: "75px" }}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(Number(e.target.value))
            }
          />
          <button onClick={async () =>
            setData(
              contract,
              inputValue,
              await getClient()
            ).then((result) => {
              addSet({
                txReceipt: result,
                value: inputValue
              });
              setValue(inputValue);
            }).catch(err =>
              console.error(err)
            )
          }>
            {emoji("📝")} Set Value
          </button>
          <div className="Code-Block">
              {syntax.class(() => <>Web3Api</>)}.
              {syntax.prop(() => <>query</>)}{"({"}<br/>
              {syntax.value(() => <>{tab()}uri: </>)}
              {syntax.string(() => <>"w3://ens/rinkeby/api.simplestorage.eth"</>)},<br/>
              {syntax.value(() => <>{tab()}query: </>)}
              {syntax.string(() => <>{"`mutation {"}</>)}<br/>
              {syntax.string(() => <>{tab()}{tab()}{"setData("}</>)}<br/>
              {syntax.string(() => <>
                {tab()}{tab()}{tab()}{"address: "}{syntax.variable(() => <>
                  "{contract.substr(0, 7)}..."</>
                )}
              </>)}<br/>
              {syntax.string(() => <>
                {tab()}{tab()}{tab()}{"value: "}{syntax.variable(() => <>
                  {inputValue}
                </>)}<br/>
              </>)}
              {syntax.string(() => <>
                {tab()}{tab()}{tab()}{"connection: {"}<br/>
                {syntax.string(() => <>
                  {tab()}{tab()}{tab()}{tab()}{"networkNameOrChainId: "}{syntax.variable(() => <>
                    {"\"rinkeby\""}
                  </>)}<br/>
                  {tab()}{tab()}{tab()}{"}"}<br/>
                </>)}
              </>)}
              {syntax.string(() => <>
                {tab()}{tab()}{")"}
              </>)}<br/>
              {syntax.string(() => <>
                {tab()}{"}`"}
              </>)}<br/>
              {"})"}
            </div>
          <p>
            {sets.length ? <>Storage History:<br/></> : <></>}
            {sets.map((set, index) => (
              <>
                #{index} | value: {set.value} | tx: {link(`https://rinkeby.etherscan.io/tx/${set.txReceipt}`, () => (
                  <>{set.txReceipt.substr(0, 7)}...</>
                ))}
                <br/>
              </>
            )).reverse()}
          </p>
        </>
        }
      </header>
    </div>
  );
}

export default App;
