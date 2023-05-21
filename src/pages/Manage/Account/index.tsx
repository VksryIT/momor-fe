import './styles.scss';

import accountAPI from 'api/account';
import ComboButton, { ComboButtonItem } from 'components/ComboButton';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { AccountData } from 'types/account';

const getColorByAssetTypeId = (assetTypeId: number) => {
  switch (true) {
    case 1 <= assetTypeId && assetTypeId <= 4:
      return 'eucalyptus';
    case 5 <= assetTypeId && assetTypeId <= 8:
      return 'turquoise';
    case 9 <= assetTypeId && assetTypeId <= 10:
      return 'green-yellow';
    case 11 <= assetTypeId && assetTypeId <= 12:
      return 'gray';
    default:
      return '';
  }
};

const Account: FC = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [assetTypes, setAssetTypes] = useState<ComboButtonItem[]>([]);
  const accountsRef = useRef<AccountData[]>();

  const updateAccounts = (accountId: number, update: (account: AccountData) => void) => {
    const newAccounts = accounts.map((account) => {
      if (account.accountId === accountId) {
        update(account);
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  const onChangeAccountName = (accountId: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const update = (account: AccountData) => {
      account.accountName = event.target.value;
    };
    updateAccounts(accountId, update);
  };

  const getAssetTypeItem = (assetTypeId: number) => {
    return assetTypes.find(({ value }) => value === assetTypeId);
  };

  const onChangeAssetType = (accountId: number) => (item: ComboButtonItem) => {
    const update = (account: AccountData) => {
      account.assetTypeId = Number(item.value);
    };
    updateAccounts(accountId, update);
  };

  useEffect(() => {
    (async () => {
      const assetTypes = await accountAPI.getAssetTypes();
      const accounts = await accountAPI.getAccounts(13);

      setAccounts(accounts);
      setAssetTypes(assetTypes.map(({ id, name }) => ({ value: id, label: name })));
      accountsRef.current = accounts;
    })();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="selection">
              <input type="checkbox" />
            </th>
            <th className="account">통장명</th>
            <th className="asset_type">자산속성</th>
            <th className="start_amount">시작금액 설정</th>
            <th className="start_date">설정일</th>
            <th className="use_status">사용중</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.accountId}>
              <td className="selection">
                <input type="checkbox" />
              </td>
              <td className="account">
                <input
                  type="text"
                  value={account.accountName}
                  onChange={onChangeAccountName(account.accountId)}
                />
              </td>
              <td className="asset_type">
                <ComboButton
                  className={`btn-asset-types ${getColorByAssetTypeId(account.assetTypeId)}`}
                  defaultItem={getAssetTypeItem(account.assetTypeId)}
                  label="선택"
                  list={assetTypes}
                  onClickItem={onChangeAssetType(account.accountId)}
                />
              </td>
              <td className="start_amount">{account.startAmount}</td>
              <td className="start_date">{account.startDate}</td>
              <td className="use_status">{account.useStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="">추가하기</div>
    </div>
  );
};

export default Account;
