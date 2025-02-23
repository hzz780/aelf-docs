---
sidebar_position: 1
title: Introduction to CLI
description: aelf's Command Line Interface
---

# Introduction to the CLI

The **aelf-command** tool is a Command Line Interface (CLI) for interacting with an aelf node. This guide shows you its key features and how to use them.

## Features

- **Configuration Management**: Set and get settings like `endpoint`, `account`, `data directory`, and `password`.
- **Interactive Prompts**: Helps new users by asking for missing parameters.
- **Account Management**: Create or load `accounts` with a private key or mnemonic.
- **Wallet Information**: Show details like private key, address, public key, and mnemonic.
- **Encryption**: Save account info in `keyStore` format.
- **Blockchain Interaction**:
  - Get the chain's `best height`.
  - Get `block information` by height or block hash.
  - Get `transaction results` by transaction ID.
  - Send transactions or call read-only methods on smart contracts.
  - Deploy smart contracts.
  - Use `REPL` (Read-Eval-Print Loop) for JavaScript interactions with the chain.
- **User Interface**: Uses chalk and ora for better visuals.
- **Chain Status**: Get the current status of the chain.
- **Proposal Management**: Create proposals on any contract method.
- **Transaction Deserialization**: Read results from transactions.
- **Socket.io Server**: Start a server for dApps.

## Installation

To install the aelf-command tool globally, use npm:

```bash
npm install aelf-command -g
```

## Using aelf-command

### First Step

Create a new account or load an existing account using a `private key` or `mnemonic`.

**Create a New Wallet**

```bash
aelf-command create
```

Example output:

```bash
Your wallet info is:
Mnemonic:            great mushroom loan crisp ... door juice embrace
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Save account info into a file? … no / yes
✔ Enter a password … ********
✔ Confirm password … ********
✔
Account info has been saved to "/Users/young/.local/share/aelf/keys/2Ue31YTuB5Szy7cnr...Gi5uMQBYarYUR5oGin1sys6H.json"
```

**Load Wallet from Private Key**

```bash
aelf-command load e038eea7e151eb451ba2901f7...b08ba5b76d8f288
```

Example output:

```bash
Your wallet info is:
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Save account info into a file? … no / yes
✔ Enter a password … ********
✔ Confirm password … ********
✔
Account info has been saved to "/Users/young/.local/share/aelf/keys/2Ue31YTuB5Szy7cnr...Gi5uMQBYarYUR5oGin1sys6H.json"
```

**Show Wallet Info**

```sh
aelf-command wallet -a 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
```

Example output:

```bash
Your wallet info is:
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
```

## Examples

##### Interactive Console

```sh
aelf-command console -a 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Enter the URI of an AElf node: http://127.0.0.1:8000
✔ Enter the password you typed when creating a wallet … ********
✔ Succeed!
Welcome to aelf interactive console. Ctrl + C to terminate the program. Double tap Tab to list objects

   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   NAME       | DESCRIPTION                                ║
   ║   AElf       | imported from aelf-sdk                     ║
   ║   aelf       | the instance of an aelf-sdk, connect to    ║
   ║              | http://127.0.0.1:8000                      ║
   ║   _account   | the instance of an AElf wallet, address    ║
   ║              | is                                         ║
   ║              | 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR…   ║
   ║              | 5oGin1sys6H                                ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝

```

##### Default Parameters

```sh
aelf-command console
✔ Enter the URI of an AElf node: http://127.0.0.1:8000
✔ Enter a valid wallet address, if you don't have, create one by aelf-command create … 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Enter the password you typed when creating a wallet … ********
✔ Succeed!
Welcome to aelf interactive console. Ctrl + C to terminate the program. Double tap Tab to list objects

   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   NAME       | DESCRIPTION                                ║
   ║   AElf       | imported from aelf-sdk                     ║
   ║   aelf       | the instance of an aelf-sdk, connect to    ║
   ║              | http://13.231.179.27:8000                  ║
   ║   _account   | the instance of an AElf wallet, address    ║
   ║              | is                                         ║
   ║              | 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR…   ║
   ║              | 5oGin1sys6H                                ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

## Help

To get help, use:

```sh
aelf-command -h
```

Output example:

```bash
Usage: aelf-command [command] [options]

Options:
  -v, --version                                            output the version number
  -e, --endpoint <URI>                                     The URI of an aelf node. Eg: http://127.0.0.1:8000
  -a, --account <account>                                  The address of aelf wallet
  -p, --password <password>                                The password of encrypted keyStore
  -d, --datadir <directory>                                The directory that contains the aelf related files. Defaults to {home}/.local/share/aelf
  -h, --help                                               output usage information

Commands:
  call [contract-address|contract-name] [method] [params]     Call a read-only method on a contract.
  send [contract-address|contract-name] [method] [params]     Execute a method on a contract.
  get-blk-height                                              Get the current block height of specified chain
  get-chain-status                                            Get the current chain status
  get-blk-info [height|block-hash] [include-txs]              Get a block info
  get-tx-result [tx-id]                                       Get a transaction result
  console                                                     Open a node REPL
  create [options] [save-to-file]                             Create a new account
  wallet                                                      Show wallet details which include private key, address, public key and mnemonic
  load [private-key|mnemonic] [save-to-file]                  Load wallet from a private key or mnemonic
  proposal [proposal-contract] [organization] [expired-time]  Send a proposal to an origination with a specific contract method
  deploy [category] [code-path]                               Deprecated! Please use  `aelf-command send` , check details in aelf-command `README.md`
  config <flag> [key] [value]                                 Get, set, delete or list aelf-command config
  event [tx-id]                                               Deserialize the result returned by executing a transaction
  dapp-server [options]                                       Start a dAPP SOCKET.IO server
```

To get help for a sub-command, such as call, use:

```sh
aelf-command call -h
```

Output example:

```sh
Usage: aelf-command call [options] [contract-address|contract-name] [method] [params]

Call a read-only method on a contract.

Options:
  -h, --help  output usage information

Examples:

aelf-command call <contractName|contractAddress> <method> <params>
aelf-command call <contractName|contractAddress> <method>
aelf-command call <contractName|contractAddress>
aelf-command call
```

For the interactive console:

```sh
aelf-command console -h
```

Output example:

```sh
Usage: aelf-command console [options]

Open a node REPL

Options:
  -h, --help  output usage information

Examples:

aelf-command console
```
