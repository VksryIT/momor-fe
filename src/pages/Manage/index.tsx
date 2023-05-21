import Page from 'components/Page';
import Tab from 'components/Tab';
import React, { FC, useMemo, useState } from 'react';

import Account from './Account';
import Card from './Card';
import Category from './Category';
import FixedItem from './FixedItem';

enum TabType {
  FIXED_ITEM = 'FIXED_ITEM',
  CATEGORY = 'CATEGORY',
  CARD = 'CARD',
  ACCOUNT = 'ACCOUNT',
}

const tabList = [
  {
    value: TabType.FIXED_ITEM,
    label: '고정금액관리',
  },
  {
    value: TabType.CATEGORY,
    label: '분류관리',
  },
  {
    value: TabType.CARD,
    label: '카드관리',
  },
  {
    value: TabType.ACCOUNT,
    label: '통장관리',
  },
];

const Manage: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabList[0].value);

  const Contents = useMemo(() => {
    switch (selectedTab) {
      case TabType.FIXED_ITEM:
        return FixedItem;
      case TabType.CATEGORY:
        return Category;
      case TabType.CARD:
        return Card;
      case TabType.ACCOUNT:
        return Account;
    }
  }, [selectedTab]);

  return (
    <Page>
      <Tab tabList={tabList} onSelect={setSelectedTab} />
      <Contents />
    </Page>
  );
};

export default Manage;
