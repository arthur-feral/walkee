import { ethers } from 'ethers';
import { getItemFromLocalStorage, LocalStorageKeys, setItemInLocalStorage } from 'services/storage';

export const ETHERSCAN_API_KEY = '2Q554ZNMHY6AMKK1NGZ93VNF2K2K9AXY9P';

export const enum Network {
  Testnet = 'rinkeby',
  Mainnet = 'mainnet'
}

export type StoredWallet = ethers.Wallet;
export type StoredWallets = Record<string, StoredWallet>;


export function getWallets(): StoredWallets {
  return getItemFromLocalStorage<StoredWallets>(LocalStorageKeys.Wallets, {});
}

export function getWallet(walletAddress: string): N<StoredWallet> {
  const wallets = getWallets();
  return wallets[walletAddress] || null;
}

export async function openWallet(
  walletAddress: string,
  password: string,
  progressCallback: (progressPercentage: number) => void,
): Promise<N<ethers.Wallet>> {
  const wallet = getWallet(walletAddress);
  try {
    const openedWallet = await ethers.Wallet.fromEncryptedJson(
      JSON.stringify(wallet),
      password,
      (progress: number) =>
        progressCallback(Math.round(progress * 100))
    );

    return openedWallet;
  } catch (error: unknown) {
    return null;
  }

}

export async function createWallet(
  password: string,
  progressCallback: (progressPercentage: number) => void,
): Promise<string> {
  const wallet = ethers.Wallet.createRandom();
  const encryptedWalletRaw = await wallet.encrypt(
    password,
    (progress: number) =>
      progressCallback(Math.round(progress * 100))
  );
  const encryptedWallet = JSON.parse(encryptedWalletRaw);
  const wallets = getWallets();
  const updatedWallets = {
    ...wallets,
    [encryptedWallet.address]: encryptedWallet,
  };
  setItemInLocalStorage(LocalStorageKeys.Wallets, updatedWallets);

  return encryptedWallet.address;
}

export function safeAddress(address: string) {
  return `0x${address.replace('0x', '')}`;
}

export function truncAddress(address: string) {
  const prefix = address.slice(0, 4);
  const sufix = address.slice(-4);

  return safeAddress(`${prefix}...${sufix}`);
}
