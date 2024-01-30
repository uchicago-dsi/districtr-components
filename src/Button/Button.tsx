import React from 'react'

import DistrictrThemeProvider from '../theme'
import { classNames } from '../utils'
import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

const DEFAULT_SIZE = 'medium'
const DEFAULT_VARIANT = 'primary'
const DEFAULT_TEXTALIGN = 'center'

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  textAlign = DEFAULT_TEXTALIGN,
  fullWidth,
  href,
  icon,
  id,
  url,
  external,
  submit,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  style,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onTouchStart,
  onPointerDown,
  onKeyPress,
  onKeyUp,
  onKeyDown,
  ...props
}) => {
  const classes = classNames(
    'd-button',
    size && `d-button--${size}`,
    variant && `d-button--${variant}`,
    textAlign && `d-button--${textAlign}`,
    fullWidth && 'd-button--full-width',
    disabled && 'd-button--disabled',
    loading && 'd-button--loading',
    pressed && 'd-button--pressed',
    className
  )
  if (href) {
    return (
      <a
        data-testid="Button"
        className={classes}
        id={id}
        href={href}
        role={role}
        aria-label={accessibilityLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-describedby={ariaDescribedBy}
        aria-checked={ariaChecked}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        onPointerDown={onPointerDown}
        tabIndex={disabled ? -1 : undefined}
        style={style}
      >
        {children}
      </a>
    )
  } else {
    return (
      <DistrictrThemeProvider>
        <StyledButton
          data-testid="Button"
          className={classes}
          id={id}
          type={submit ? 'submit' : 'button'}
          disabled={disabled}
          role={role}
          aria-label={accessibilityLabel}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-describedby={ariaDescribedBy}
          aria-checked={ariaChecked}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onMouseEnter}
          onTouchStart={onTouchStart}
          onPointerDown={onPointerDown}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          tabIndex={disabled ? -1 : undefined}
          style={style}
        >
          {children}
        </StyledButton>
      </DistrictrThemeProvider>
    )
  }
}

export default Button
