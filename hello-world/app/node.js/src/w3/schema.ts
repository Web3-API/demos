export const schema: string = `### Web3API Header START ###
scalar UInt
scalar UInt8
scalar UInt16
scalar UInt32
scalar Int
scalar Int8
scalar Int16
scalar Int32
scalar Bytes
scalar BigInt
scalar BigNumber
scalar JSON
scalar Map

directive @imported(
  uri: String!
  namespace: String!
  nativeType: String!
) on OBJECT | ENUM

directive @imports(
  types: [String!]!
) on OBJECT

directive @capability(
  type: String!
  uri: String!
  namespace: String!
) repeatable on OBJECT

directive @enabled_interface on OBJECT

directive @annotate(type: String!) on FIELD

### Web3API Header END ###

### Imported Queries START ###

type HelloWorld_Query @imported(
  uri: "ens/helloworld.web3api.eth",
  namespace: "HelloWorld",
  nativeType: "Query"
) {
  logMessage(
    message: String!
  ): Boolean!
}

type Ethereum_Query @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Query"
) {
  callContractView(
    address: String!
    method: String!
    args: [String!]
    connection: Ethereum_Connection
  ): String!

  callContractStatic(
    address: String!
    method: String!
    args: [String!]
    connection: Ethereum_Connection
    txOverrides: Ethereum_TxOverrides
  ): Ethereum_StaticTxResult!

  getBalance(
    address: String!
    blockTag: BigInt
    connection: Ethereum_Connection
  ): BigInt!

  encodeParams(
    types: [String!]!
    values: [String!]!
  ): String!

  encodeFunction(
    method: String!
    args: [String!]
  ): String!

  solidityPack(
    types: [String!]!
    values: [String!]!
  ): String!

  solidityKeccak256(
    types: [String!]!
    values: [String!]!
  ): String!

  soliditySha256(
    types: [String!]!
    values: [String!]!
  ): String!

  getSignerAddress(
    connection: Ethereum_Connection
  ): String!

  getSignerBalance(
    blockTag: BigInt
    connection: Ethereum_Connection
  ): BigInt!

  getSignerTransactionCount(
    blockTag: BigInt
    connection: Ethereum_Connection
  ): BigInt!

  getGasPrice(
    connection: Ethereum_Connection
  ): BigInt!

  estimateTransactionGas(
    tx: Ethereum_TxRequest!
    connection: Ethereum_Connection
  ): BigInt!

  estimateContractCallGas(
    address: String!
    method: String!
    args: [String!]
    connection: Ethereum_Connection
    txOverrides: Ethereum_TxOverrides
  ): BigInt!

  checkAddress(
    address: String!
  ): Boolean!

  toWei(
    eth: String!
  ): BigInt!

  toEth(
    wei: BigInt!
  ): String!

  awaitTransaction(
    txHash: String!
    confirmations: UInt32!
    timeout: UInt32!
    connection: Ethereum_Connection
  ): Ethereum_TxReceipt!

  waitForEvent(
    address: String!
    event: String!
    args: [String!]
    timeout: UInt32
    connection: Ethereum_Connection
  ): Ethereum_EventNotification!

  getNetwork(
    connection: Ethereum_Connection
  ): Ethereum_Network!
}

type Ethereum_Mutation @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Mutation"
) {
  callContractMethod(
    address: String!
    method: String!
    args: [String!]
    connection: Ethereum_Connection
    txOverrides: Ethereum_TxOverrides
  ): Ethereum_TxResponse!

  callContractMethodAndWait(
    address: String!
    method: String!
    args: [String!]
    connection: Ethereum_Connection
    txOverrides: Ethereum_TxOverrides
  ): Ethereum_TxReceipt!

  sendTransaction(
    tx: Ethereum_TxRequest!
    connection: Ethereum_Connection
  ): Ethereum_TxResponse!

  sendTransactionAndWait(
    tx: Ethereum_TxRequest!
    connection: Ethereum_Connection
  ): Ethereum_TxReceipt!

  deployContract(
    abi: String!
    bytecode: String!
    args: [String!]
    connection: Ethereum_Connection
  ): String!

  signMessage(
    message: String!
    connection: Ethereum_Connection
  ): String!

  sendRPC(
    method: String!
    params: [String!]!
    connection: Ethereum_Connection
  ): String
}

### Imported Queries END ###

### Imported Objects START ###

type Ethereum_TxReceipt @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "TxReceipt"
) {
  to: String!
  from: String!
  contractAddress: String!
  transactionIndex: UInt32!
  root: String
  gasUsed: BigInt!
  logsBloom: String!
  transactionHash: String!
  logs: [Ethereum_Log!]!
  blockNumber: BigInt!
  blockHash: String!
  confirmations: UInt32!
  cumulativeGasUsed: BigInt!
  effectiveGasPrice: BigInt!
  byzantium: Boolean!
  type: UInt32!
  status: UInt32
}

type Ethereum_Log @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Log"
) {
  blockNumber: BigInt!
  blockHash: String!
  transactionIndex: UInt32!
  removed: Boolean!
  address: String!
  data: String!
  topics: [String!]!
  transactionHash: String!
  logIndex: UInt32!
}

type Ethereum_TxResponse @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "TxResponse"
) {
  hash: String!
  to: String
  from: String!
  nonce: UInt32!
  gasLimit: BigInt!
  gasPrice: BigInt
  data: String!
  value: BigInt!
  chainId: BigInt!
  blockNumber: BigInt
  blockHash: String
  timestamp: UInt32
  confirmations: UInt32!
  raw: String
  r: String
  s: String
  v: UInt32
  type: UInt32
  accessList: [Ethereum_Access!]
}

type Ethereum_Access @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Access"
) {
  address: String!
  storageKeys: [String!]!
}

type Ethereum_TxRequest @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "TxRequest"
) {
  to: String
  from: String
  nonce: UInt32
  gasLimit: BigInt
  gasPrice: BigInt
  data: String
  value: BigInt
  chainId: BigInt
  type: UInt32
}

type Ethereum_TxOverrides @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "TxOverrides"
) {
  gasLimit: BigInt
  gasPrice: BigInt
  value: BigInt
}

type Ethereum_StaticTxResult @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "StaticTxResult"
) {
  result: String!
  error: Boolean!
}

type Ethereum_EventNotification @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "EventNotification"
) {
  data: String!
  address: String!
  log: Ethereum_Log!
}

type Ethereum_Connection @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Connection"
) {
  node: String
  networkNameOrChainId: String
}

type Ethereum_Network @imported(
  uri: "ens/ethereum.web3api.eth",
  namespace: "Ethereum",
  nativeType: "Network"
) {
  name: String!
  chainId: BigInt!
  ensAddress: String
}

### Imported Objects END ###
`;
