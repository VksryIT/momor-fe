import './styles.scss';

import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { className, disabled, children, ...restProps } = props;

  return (
    <button
      type="button"
      className={classNames(className, { disabled })}
      disabled={disabled}
      ref={ref}
      {...restProps}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
