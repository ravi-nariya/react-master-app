import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '@components/Icon'
import type { IconName } from '@components/Icon'
import './button.css'

type ButtonVariant = 'text' | 'outlined' | 'contained' | 'icon'

type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  fullWidth?: boolean
  startIcon?: IconName
  endIcon?: IconName
}

export const Button = (props: ButtonProps) => {
  const {
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    startIcon,
    endIcon,
    children,
    className,
    type = 'button',
    ...rest
  } = props

  const cls = [
    'button',
    `button--variant-${variant}`,
    `button--color-${color}`,
    `button--size-${size}`,
    fullWidth && 'button--full-width',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} type={type} {...rest}>
      {startIcon ? (
        <span className="button__icon button__icon--start" aria-hidden="true">
          <Icon iconName={startIcon} />
        </span>
      ) : null}
      {children ? <span className="button__label">{children}</span> : null}
      {endIcon ? (
        <span className="button__icon button__icon--end" aria-hidden="true">
          <Icon iconName={endIcon} />
        </span>
      ) : null}
    </button>
  )
}

export type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant }