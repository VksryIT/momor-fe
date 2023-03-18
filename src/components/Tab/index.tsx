import './styles.scss';

import classNames from 'classnames';
import React, { MouseEvent, PropsWithChildren, useState } from 'react';

interface TabItem<T> {
  value: T;
  label: string;
}

interface TabProps<T> {
  tabList: Array<TabItem<T>>;
  onSelect: (value: T) => void;
}

const Tab = <T,>({ tabList, onSelect }: PropsWithChildren<TabProps<T>>) => {
  const [selected, setSelected] = useState<T>(tabList[0].value);

  const onClickTab = (_value: T) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelected(_value);
    onSelect(_value);
  };

  return (
    <div className="tab">
      {tabList.map((tab, index) => (
        <a
          key={index}
          href="#"
          role="tab"
          className={classNames('tab_item', { selected: tab.value === selected })}
          onClick={onClickTab(tab.value)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};

export default Tab;
