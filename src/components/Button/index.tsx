import './styles.scss';

import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ className, disabled, onClick, children }) => {
  return (
    <button
      type="button"
      className={classNames(className, { disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
