---
sidebar_position: 1
title: Integration Guide
description: Learn how to integrate with other tools and DApps
---

# Introduction

**aelf-web-login**: Modular React wallet collection and components for aelf applications.

**website**: https://aelf-web-login.vercel.app/

# Install

```sh
yarn add @aelf-web-login/wallet-adapter-night-elf @aelf-web-login/wallet-adapter-portkey-aa @aelf-web-login/wallet-adapter-portkey-discover @aelf-web-login/wallet-adapter-react @aelf-web-login/wallet-adapter-base @aelf-web-login/wallet-adapter-bridge
```

Then the `package.json` will be like this

```json
"dependencies": {
    "@aelf-web-login/wallet-adapter-night-elf": "^0.0.2-alpha.7",
    "@aelf-web-login/wallet-adapter-portkey-aa": "^0.0.2-alpha.7",
    "@aelf-web-login/wallet-adapter-portkey-discover": "^0.0.2-alpha.7",
    "@aelf-web-login/wallet-adapter-react": "^0.0.2-alpha.7",
    "@aelf-web-login/wallet-adapter-base": "^0.0.2-alpha.7",
    "@aelf-web-login/wallet-adapter-bridge": "^0.0.2-alpha.7",
}
```

# Config

1. Import `PortkeyDiscoverWallet`, `PortkeyAAWallet` and `NightElfWallet` and generate instance
2. Create `didConfig` (internal invoke: `ConfigProvider.setGlobalConfig(didConfig)`)
3. Create `baseConfig` for `SignIn` component
4. Create `wallets` by wallet instance
5. Combine them into a whole as `config`

```ts
import { PortkeyDiscoverWallet } from '@aelf-web-login/wallet-adapter-portkey-discover';
import { PortkeyAAWallet } from '@aelf-web-login/wallet-adapter-portkey-aa';
import { NightElfWallet } from '@aelf-web-login/wallet-adapter-night-elf';
import { IConfigProps } from '@aelf-web-login/wallet-adapter-bridge';
import { TChainId, SignInDesignEnum, NetworkEnum } from '@aelf-web-login/wallet-adapter-base';

const APP_NAME = 'explorer.aelf.io';
const WEBSITE_ICON = 'https://explorer.aelf.io/favicon.main.ico';
const CHAIN_ID = 'AELF' as TChainId;
const NETWORK_TYPE = NetworkEnum.TESTNET;
const RPC_SERVER_AELF = 'https://aelf-test-node.aelf.io';
const RPC_SERVER_TDVV = 'https://tdvv-public-node.aelf.io';
const RPC_SERVER_TDVW = 'https://tdvw-test-node.aelf.io';
const GRAPHQL_SERVER = 'https://dapp-aa-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql';
const CONNECT_SERVER = 'https://auth-aa-portkey-test.portkey.finance';

const didConfig = {
  graphQLUrl: GRAPHQL_SERVER,
  connectUrl: CONNECT_SERVER,
  requestDefaults: {
    baseURL: 'https://aa-portkey-test.portkey.finance',
    timeout: 30000,
  },
  socialLogin: {
    Portkey: {
      websiteName: APP_NAME,
      websiteIcon: WEBSITE_ICON,
    },
  },
};

const baseConfig = {
  networkType: NETWORK_TYPE,
  chainId: CHAIN_ID,
  keyboard: true,
  noCommonBaseModal: false,
  design: SignInDesignEnum.CryptoDesign, // "SocialDesign" | "CryptoDesign" | "Web2Design"
  titleForSocialDesign: 'Crypto wallet',
  iconSrcForSocialDesign: 'url or base64',
};

const wallets = [
  new PortkeyAAWallet({
    appName: APP_NAME,
    chainId: CHAIN_ID,
    autoShowUnlock: true,
  }),
  new PortkeyDiscoverWallet({
    networkType: NETWORK_TYPE,
    chainId: CHAIN_ID,
    autoRequestAccount: true,
    autoLogoutOnDisconnected: true,
    autoLogoutOnNetworkMismatch: true,
    autoLogoutOnAccountMismatch: true,
    autoLogoutOnChainMismatch: true,
  }),
  new NightElfWallet({
    chainId: CHAIN_ID,
    appName: APP_NAME,
    connectEagerly: true,
    defaultRpcUrl: RPC_SERVER_AELF,
    nodes: {
      AELF: {
        chainId: 'AELF',
        rpcUrl: RPC_SERVER_AELF,
      },
      tDVW: {
        chainId: 'tDVW',
        rpcUrl: RPC_SERVER_TDVW,
      },
      tDVV: {
        chainId: 'tDVV',
        rpcUrl: RPC_SERVER_TDVV,
      },
    },
  }),
]

const config: IConfigProps = {
  didConfig,
  baseConfig,
  wallets
};
```

# Usage

1. Import `WebLoginProvider`, `init` and `useConnectWallet`
2. invoke `init` with upper config as params
3. pass the return value `bridgeAPI` to `WebLoginProvider`
4. use `useConnectWallet` to consume `bridgeAPI`

```tsx
import { WebLoginProvider, init, useConnectWallet } from '@aelf-web-login/wallet-adapter-react';

const App = () => {
  const bridgeAPI = init(config); // upper config
  return (
    <WebLoginProvider bridgeAPI={bridgeAPI}>
      <Demo />
    </WebLoginProvider>
  );
};
const Demo = () => {
  const {
    connectWallet,
    disConnectWallet,
    walletInfo,
    lock,
    isLocking,
    isConnected,
    loginError,
    walletType,
    getAccountByChainId,
    getWalletSyncIsCompleted,
    getSignature,
    callSendMethod,
    callViewMethod
  } = useConnectWallet();
}
```

# API

## connectWallet

```ts
connectWallet: () => Promise<TWalletInfo>
```

> Connect wallet and return walletInfo

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { connectWallet } = useConnectWallet();
    const onConnectBtnClickHandler = async() => {
        try {
          const rs = await connectWallet();
        } catch (e: any) {
          console.log(e.message)
        }
    }
    return (
        <Button onClick={onConnectBtnClickHandler}>connect</Button>
    )
}
```

## disConnectWallet

```ts
disConnectWallet: () => Promise<void>
```

> Disconnect wallet

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { disConnectWallet } = useConnectWallet();
    const onDisConnectBtnClickHandler = () => {
        disConnectWallet()
    }
    return (
        <Button onClick={onDisConnectBtnClickHandler}>disConnect</Button>
    )
}
```

## lock

```ts
lock: () => void
```

> Lock wallet, only portkeyAA wallet take effect

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { lock } = useConnectWallet();
    return (
        <Button onClick={lock}>lock</Button>
    )
}
```

## getAccountByChainId

```ts
getAccountByChainId: (chainId: TChainId) => Promise<string>
```

> Get account address of designative chainId

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { getAccountByChainId } = useConnectWallet();

    const getAelfAccountHandler = async() => {
        const address = await getAccountByChainId('AELF')
        console.log(address)
    }
    const getTdvwAccountHandler = async() => {
        const address = await getAccountByChainId('tDVW')
        console.log(address)
    }
    return (
        <Button onClick={getAelfAccountHandler}>account-AELF</Button>
        <Button onClick={getTdvwAccountHandler}>account-tDVW</Button>
    )
}
```

## getWalletSyncIsCompleted

```ts
getWalletSyncIsCompleted: (chainId: TChainId) => Promise<string | boolean>
```

> Return account address of designative chainId if sync is competed, otherwise return false

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { getWalletSyncIsCompleted } = useConnectWallet();

    const getAelfSyncIsCompletedHandler = async() => {
        const address = await getWalletSyncIsCompleted('AELF')
        console.log(address)
    }
    const getTdvwSyncIsCompletedHandler = async() => {
        const address = await getWalletSyncIsCompleted('tDVW')
        console.log(address)
    }
    return (
        <Button onClick={getAelfSyncIsCompletedHandler}>sync-AELF</Button>
        <Button onClick={getTdvwSyncIsCompletedHandler}>sync-tDVW</Button>
    )
}
```

## getSignature

```ts
const getSignature: (params: TSignatureParams) => Promise<{ ``    error: number; ``    errorMessage: string; ``    signature: string; ``    from: string; ``} | null>
```

> Get signature message

```tsx
import { Button, Input } from 'aelf-design';

type TSignatureParams = {
  appName: string;
  address: string;
  signInfo: string;
  hexToBeSign?: string;
};

const Demo = () => {
    const { getSignature } = useConnectWallet();
    const [signInfo, setSignInfo] = useState('');
    const [signedMessage, setSignedMessage] = useState('');

    const signHandler = async () => {
      const sign = await getSignature({
        signInfo,
        appName: '',
        address: '',
      });
      setSignedMessage(sign.signature);
    };

    return (
        div>
          <div>
            <Button onClick={signHandler}>
              Sign
            </Button>
            <Input value={signInfo} onChange={(e) => setSignInfo(e.target.value)} />
            <div>{signedMessage}</div>
          </div>
        </div>
    )
}
```

## callSendMethod

```ts
callSendMethod: <T, R>(props: ICallContractParams<T>) => Promise<R>
```

> Call contract's send method

```tsx
import { Button } from 'aelf-design';

interface ICallContractParams<T> {
  contractAddress: string;
  methodName: string;
  args: T;
  chainId?: TChainId;
  sendOptions?: SendOptions;
}

const Demo = () => {
    const { callSendMethod } = useConnectWallet();
    const [result, setResult] = useState({});

    const onApproveHandler = async() => {
        const res = await callSendMethod({
          chainId: 'tDVW',
          contractAddress: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
          methodName: 'Approve',
          args: {
            symbol: 'ELF',
            spender: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
            amount: '100000000',
          },
        });
        setResult(res);
    }

    return (
      <div>
        <Button onClick={onApproveHandler}>Approve in tDVW</Button>
        <div>
          <h4>Result</h4>
          <pre className="result">{JSON.stringify(result, null, '  ')}</pre>
        </div>
      </div>
    )
}
```

## callViewMethod

```ts
callViewMethod: <T, R>(props: ICallContractParams<T>) => Promise<R>
```

> Call contract's view method

```tsx
import { Button } from 'aelf-design';

interface ICallContractParams<T> {
  contractAddress: string;
  methodName: string;
  args: T;
  chainId?: TChainId;
  sendOptions?: SendOptions; // only send method use, ignore in view method
}

const Demo = () => {
    const { callViewMethod, getAccountByChainId } = useConnectWallet();
    const [result, setResult] = useState({});

    const onGetBalanceHandler = async() => {
        const res = await callViewMethod({
          chainId: 'tDVW',
          contractAddress: 'ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx',
          methodName: 'GetBalance',
          args: {
            symbol: 'ELF',
            owner: await getAccountByChainId('tDVW'),
          },
        });
        setResult(res);
    }

    return (
      <div>
        <Button onClick={onGetBalanceHandler}>GetBalance in tDVW</Button>
        <div>
          <h4>Result</h4>
          <pre className="result">{JSON.stringify(result, null, '  ')}</pre>
        </div>
      </div>
    )
}
```

## walletInfo

```ts
const walletInfo: TWalletInfo
```

> Wallet information after connecting wallet, can import `TWalletInfo` from `@aelf-web-login/wallet-adapter-base`

```tsx
type TWalletInfo =
  | {
      name?: string;
      address: string;
      extraInfo?: {
        [key: string]: any;
      };
    }
  | undefined;

  // walletInfo returned by nightElf
  {
    name,
    address,
    extraInfo: {
      publicKey,
      nightElfInfo: {
        name,
        appPermission,
        defaultAElfBridge: bridge,
        aelfBridges: bridges,
        nodes,
      },
    },
  }

  // walletInfo returned by portkeyAA
  import { DIDWalletInfo } from '@portkey/did-ui-react';
  {
    name,
    address,
    extraInfo: {
      publicKey,
      portkeyInfo: {
        ...DIDWalletInfo
        accounts: {
          [chainId]: didWalletInfo.caInfo?.caAddress,
        },
        nickName,
      },
    },
  }

  // walletInfo returned by portkeyDiscover
  import type { Accounts, IPortkeyProvider } from '@portkey/provider-types';
  {
    address,
    extraInfo: {
      accounts: Accounts,
      nickName,
      provider: IPortkeyProvider,
    },
  }

const Demo = () => {
    const { walletInfo } = useConnectWallet();
    console.log(walletInfo)
    return null
}
```

## walletType

```ts
const walletType: WalletTypeEnum
```

> The currently connected wallet type, can import `WalletTypeEnum` from `@aelf-web-login/wallet-adapter-base`

```tsx
enum WalletTypeEnum {
  unknown = 'Unknown',
  elf = 'NightElf',
  aa = 'PortkeyAA',
  discover = 'PortkeyDiscover',
}

const Demo = () => {
    const { walletType } = useConnectWallet();
    console.log(walletType)
    return null
}
```

## isLocking

```ts
const isLocking: boolean
```

> indicate whether the current state is locked, only portkeyAA wallet take effect, other wallets always return false

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { isLocking } = useConnectWallet();

    return (
      <Button>
        {isLocking ? 'unlock' : 'connect'}
      </Button>
    )
}
```

## isConnected

```ts
const isConnected: boolean
```

> indicate whether the current state is connected

```tsx
import { Button } from 'aelf-design';

const Demo = () => {
    const { isConnected } = useConnectWallet();

    return (
      <div>
        <Button disabled={isConnected}>connect</Button>
        <Button disabled={!isConnected}>disConnect</Button>
      </div>
    )
}
```

## loginError

```ts
const loginError: TWalletError | null
```

> indicate are there any errors during the login/logout/unlock process

```tsx
type TWalletError = {
  name: string;
  code: number;
  message: string;
  nativeError?: any;
}

const Demo = () => {
  const { loginError } = useConnectWallet();

  useEffect(() => {
    if (!loginError) {
      return;
    }
    console.log(loginError.message);
  }, [loginError]);

  return null
}
```

# Development

1. Install dependencies in the project root directory

```sh
pnpm install
```

2. cd to demo directory and execute dev command

```sh
cd packages/starter
pnpm dev
```

# Publish

1. Upgrade the version numbers of each sub package
2. execute release command in the project root directory

```sh
pnpm release
```
