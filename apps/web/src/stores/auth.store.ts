import localforage from "localforage";
import { map } from "nanostores";
import type { UserType } from "src/globals/types";

type AuthStoreType = {
  access_token?: string;
  userInfo?: UserType;
};

const initialState: AuthStoreType =
  (await localforage.getItem("AuthStore")) || {};

export const AuthStore = map<AuthStoreType>(initialState);
