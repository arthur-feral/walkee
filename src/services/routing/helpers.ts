export const enum Routing {
  Root = '/',
  Wallets = '/wallets',
  Wallet = '/wallets/:walletId',
  WalletNew = '/wallets/new',
}

export function getRoute(routing: Routing, params?: Record<string, any>): string {
  let route = String(routing);

  if (params) {
    Object.keys(params).forEach((key) => {
      route = route.replace(`:${key}`, params[key]);
    });
  }

  return route;
}
