export interface AssetType {
  id: number;
  name: string;
}

export enum UseStatus {
  NOT_USING = 0,
  USING = 1,
}

export interface AccountData {
  accountId: number; // 통장 식별 번호
  accountName: string; // 통장 이름
  assetTypeId: number; // 자산 속정 번호
  startAmount: number; // 시작 금액
  startDate: string; // 설정 시작일. yyyy-mm-dd
  useStatus: UseStatus; // 사용중 여부. 0 or 1

  createdDate: string;
  updateDate: string;
  userId: number;
}
