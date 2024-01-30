import React from 'react'

export interface ButtonProps {
  /** Button descendants */
  children?: React.ReactNode
  /** Custom class name to apply */
  className?: string
  /** Button size */
  size?: 'small' | 'medium' | 'large'
  /** Button variant styles */
  variant?: 'primary' | 'secondary' | 'warning' | 'toolbar' | 'text' | 'swatch' | 'toggle'
  /** Text alignemnt of text in button  */
  textAlign?: 'left' | 'center' | 'right'
  /** Expands horizonatlly to fill parent width */
  fullWidth?: boolean
  /** Url for link */
  href?: string
  /** Icon to display */
  icon?: any
  /** Id of button */
  id?: string
  /** Adds an href attribute to button */
  url?: string
  /** Will open external link in new tab */
  external?: boolean
  /** Allows button to submit a form */
  submit?: boolean
  /** Disabled the button */
  disabled?: boolean
  /** Adds a loading spinner to the button */
  loading?: boolean
  /** Sets the button to a pressed state */
  pressed?: boolean
  /** Adds hidden text for screen readers  */
  accessibilityLabel?: string
  /** WAI-ARIA role */
  role?: string
  /** Id of the element the button controls */
  ariaControls?: string
  /** Indicates to screen readers that the button is expaned. */
  ariaExpanded?: boolean
  /** Id of the element that described the button. */
  ariaDescribedBy?: string
  /** Indicated that the button is checked / pressed. */
  ariaChecked?: boolean
  /** Inline CSS Styles */
  style?: React.CSSProperties

  /** Callback when button is clicked */
  onClick?(): void
  /** Callback when button is pressed */
  onFocus?(): void
  /** Callback when button is released */
  onBlur?(): void
  /** Callback when the mouse enters the button */
  onMouseEnter?(): void
  /** Call back when touch event begins */
  onTouchStart?(): void
  /** Callback for pointerdown event. */
  onPointerDown?(): void
  /** Callback for key press event */
  onKeyPress?(event: React.KeyboardEvent<HTMLButtonElement>): void
  /** Callback for key up event */
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void
  /** Callback for key down event */
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void
}
