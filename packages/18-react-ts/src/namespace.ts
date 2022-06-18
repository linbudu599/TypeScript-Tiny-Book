export namespace RealCurrency {
  export class WeChatPaySDK {}

  export class ALiPaySDK {}

  export class MeiTuanPaySDK {}

  export class CreditCardPaySDK {}
}

export namespace VirtualCurrency {
  export class QQCoinPaySDK {}

  export namespace BlockChainCurrency {
    export class BitCoinPaySDK {}

    export class ETHPaySDK {}
  }
}

const ethPaySDK = new VirtualCurrency.BlockChainCurrency.ETHPaySDK();
