import API from 'api/API';

import { AccountData, AssetType } from './../../types/account';

class AccountAPI extends API {
  /**
   * 통장의 자산 속성을 불러온다.
   */
  getAssetTypes() {
    return this.get<AssetType[]>('/accounts/asset-types');
  }

  /**
   * 통장 정보를 불러온다.
   */
  getAccounts(userId: number) {
    return this.get<AccountData[]>(`/users/${userId}/accounts`);
  }
}

const accountAPI = new AccountAPI();

export default accountAPI;
