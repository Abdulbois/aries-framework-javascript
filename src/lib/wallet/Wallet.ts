import { InboundMessage, Message } from '../types';

export interface Wallet {
  init(): Promise<void>;
  close(): Promise<void>;
  delete(): Promise<void>;
  initPublicDid(did: Did, seed: string): Promise<void>;
  getPublicDid(): DidInfo | {};
  createDid(didConfig?: DidConfig): Promise<[Did, Verkey]>;
  pack(payload: {}, recipientKeys: Verkey[], senderVk: Verkey | null): Promise<JsonWebKey>;
  unpack(messagePackage: JsonWebKey): Promise<InboundMessage>;
  sign(message: Message, attribute: string, verkey: Verkey): Promise<Message>;
  verify(message: Message, attribute: string): Promise<Message>;
  addWalletRecord(type: string, id: string, value: string, tags: {}): Promise<void>;
  updateWalletRecordValue(type: string, id: string, value: string): Promise<void>;
  updateWalletRecordTags(type: string, id: string, tags: {}): Promise<void>;
  deleteWalletRecord(type: string, id: string): Promise<void>;
  getWalletRecord(type: string, id: string, options: {}): Promise<WalletRecord>;
  search(type: string, query: {}, options: {}): Promise<AsyncIterable<WalletRecord>>;
}

export interface DidInfo {
  did: Did;
  verkey: Verkey;
}

export interface DidConfig {
  did: string;
  seed: string;
}

export interface WalletConfig {
  id: string;
  storage_type?: string;
  storage_config?: WalletStorageConfig;
}

export interface WalletStorageConfig {
  path?: string;
}

export interface WalletCredentials {
  key: string;
  storage_credentials?: {};
  key_derivation_method?: WalletKeyDerivationMethod;
}

export enum WalletKeyDerivationMethod {
  ARGON2I_MOD = 'ARGON2I_MOD',
  ARGON2I_INT = 'ARGON2I_INT',
  RAW = 'RAW',
}
