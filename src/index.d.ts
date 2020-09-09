import { Component, ReactNode } from 'react';
import { ViewProperties, EmitterSubscription } from 'react-native';
import { EventEmitter } from 'events';

type TapjoyEvent = string;

interface Constants {
  events: TapjoyEvent[];
}

interface RNTapjoyProps {
  sdkKeyIos: string;
  sdkKeyAndroid: string;
  gcmSenderIdAndroid?: string;
  debug: boolean;
}

interface Currency {
  amount: number;
  currencyName: string;
  currencyID?: string;
}

export class Tapjoy extends Component<RNTapjoyProps & ViewProperties> {
  static constants: Constants;

  setUserId(userId: string): Promise<null>;
  initialise(): Promise<null>;
  spendCurrency(amount: number): Promise<null>;
  isConnected(): Promise<boolean>;
  addPlacement(name: string): Promise<string>;
  requestContent(name: string): Promise<string>;
  showPlacement(name: string): Promise<string>;
  getCurrencyBalance(): Promise<Currency>;
  listenForEarnedCurrency(): Promise<Currency>;
  _on(eventName: string, callback: () => void): Promise<EventEmitter>;
}

type HookReturn = [
  {
    tapjoyEvents: TapjoyEvent[];
  },
  {
    initialiseTapjoy: () => Promise<null>;
    listenToEvent: (
      eventName: TapjoyEvent,
      callback: () => {},
    ) => Promise<EmitterSubscription>;
    addTapjoyPlacement: (placementName: string) => Promise<string>;
    showTapjoyPlacement: (placementName: string) => Promise<string>;
    requestTapjoyPlacementContent: (placementName: string) => Promise<string>;
    isTapjoyConnected: () => Promise<boolean>;
    tapjoyListenForEarnedCurrency: (
      callback: (currency: Currency) => {},
    ) => Promise<null>;
    getTapjoyCurrencyBalance: (eventName: TapjoyEvent) => Promise<Currency>;
    setTapjoyUserId: (userId: string) => Promise<null>;
    spendTapjoyCurrency: (amount: number) => Promise<null>;
  },
];

export function useTapjoy(options: RNTapjoyProps): HookReturn;
