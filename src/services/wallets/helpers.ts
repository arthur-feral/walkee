import { ethers } from 'ethers';

export const enum Network {
  Testnet = 'rinkeby',
  Mainnet = 'mainnet'
}
export const ETHERSCAN_API_KEY = '2Q554ZNMHY6AMKK1NGZ93VNF2K2K9AXY9P';

export function createWallet() {
  return ethers.Wallet.createRandom();
}
