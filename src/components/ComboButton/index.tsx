import './styles.scss';

import classNames from 'classnames';
import Button from 'components/Button';
import React, { FC, useRef, useState } from 'react';

type Value = number | string;

export interface ComboButtonItem {
  value: Value;
  label: string;
}

interface ComboButtonProps {
  className?: string;
  defaultItem?: ComboButtonItem;
  label: string;
  list: ComboButtonItem[];
  onClickItem: (item: ComboButtonItem) => void;
}

const ComboButton: FC<ComboButtonProps> = ({
  className,
  defaultItem,
  label,
  list,
  onClickItem,
}) => {
  const [openLayer, setOpenLayer] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ComboButtonItem | undefined>(defaultItem);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const boundingClientRect = buttonRef.current?.getBoundingClientRect();

  const handleClickItem = (item: ComboButtonItem) => () => {
    onClickItem(item);
    setSelectedItem(item);
    setOpenLayer(false);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        className={`btn-combo ${className}`}
        onClick={() => setOpenLayer(!openLayer)}
      >
        {selectedItem?.label || label}
      </Button>
      {openLayer && (
        <div
          className="layer ly-combo"
          style={{
            left: (boundingClientRect?.left || 0) + window.scrollX,
            top: (boundingClientRect?.top || 0) + window.scrollY,
          }}
        >
          <ul>
            {list.map((item) => (
              <li
                className={classNames('item', { selected: item.value === selectedItem?.value })}
                key={item.value}
                onClick={handleClickItem(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ComboButton;
