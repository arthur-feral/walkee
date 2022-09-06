import { getRoute, Routing } from './helpers';

describe('getRoute', () => {
  test('returns the route', () => {
    const route = getRoute(Routing.Wallets);
    expect(route).toEqual('/wallets');
  });

  describe('with params', function () {
    test('returns the route with proper params', () => {
      const route = getRoute(Routing.Wallet, { walletId: '0xabc123' });
      expect(route).toEqual('/wallets/0xabc123');
    });

    test('returns the route with proper params', () => {
      const route = getRoute(Routing.Wallet, { walletId: 123, unhandledParam: 123 });
      expect(route).toEqual('/wallets/123');
    });

    test('returns the route with proper params', () => {
      const route = getRoute(Routing.Wallet, { walletId: null, unhandledParam: 123 });
      expect(route).toEqual('/wallets/null');
    });

    test('returns the route with proper params', () => {
      const route = getRoute(Routing.Wallet, { walletId: undefined, unhandledParam: 123 });
      expect(route).toEqual('/wallets/undefined');
    });
  });
});

