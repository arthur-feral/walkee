import { createWallet, formatAddress, getWallet, getWallets, openWallet, truncAddress } from './helpers';

describe('wallets helpers', () => {
  describe('formatAddress', () => {
    test('returns address formated with 0x', () => {
      const address = formatAddress('0x13462890d5152381aee3932ac5d203f567ffb54f');
      expect(address).toEqual('0x13462890d5152381aee3932ac5d203f567ffb54f');
    });
    test('returns address formated with 0x', () => {
      const address = formatAddress('13462890d5152381aee3932ac5d203f567ffb54f');
      expect(address).toEqual('0x13462890d5152381aee3932ac5d203f567ffb54f');
    });
  });

  describe('truncAddress', () => {
    test('returns address formatted and truncated with 0x', () => {
      const address = truncAddress('0x13462890d5152381aee3932ac5d203f567ffb54f');
      expect(address).toEqual('0x1346...b54f');
    });

    test('returns address formatted and truncated with 0x', () => {
      const address = truncAddress('13462890d5152381aee3932ac5d203f567ffb54f');
      expect(address).toEqual('0x1346...b54f');
    });
  });

  describe('createWallet', () => {
    test('create and store wallet', async () => {
      expect(getWallets()).toEqual({});
      const address = await createWallet(
        'password'
      );

      expect(address).not.toBe(null);
      expect(address.length).toEqual(40);
      const wallets = getWallets();
      expect(wallets[address]).not.toBe(undefined);
    }, 10000);
  });

  describe('openWallet', () => {
    test('open a and decrypt a stored wallet', async () => {
      const address = await createWallet(
        'password'
      );
      const storedWallet = getWallet(address);
      expect(storedWallet).not.toBe(null);

      const wallet = await openWallet(
        address,
        'password'
      );
      expect(wallet).not.toBe(null);
      expect(wallet?.address?.toLowerCase()).toEqual(`0x${address.toLowerCase()}`);
    }, 20000);
  });
});
