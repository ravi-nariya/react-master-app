import type { AnchorHTMLAttributes } from 'react'
import { Icon } from '@components/Icon'
import type { IconName } from '@components/Icon'
import './link.css'

type LinkVariant = 'default' | 'subtle' | 'standalone'
type LinkColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
type LinkSize = 'small' | 'medium' | 'large'
type LinkUnderline = 'always' | 'hover' | 'none'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: LinkVariant
  color?: LinkColor
  size?: LinkSize
  underline?: LinkUnderline
  external?: boolean
  startIcon?: IconName
  endIcon?: IconName
}

export const Link = ({
  variant = 'default',
  color = 'primary',
  size = 'medium',
  underline = 'hover',
  external = false,
  startIcon,
  endIcon,
  children,
  className,
  href,
  target,
  rel,
  ...rest
}: LinkProps) => {
  const isExternal = external || target === '_blank'
  const safeTarget = isExternal ? '_blank' : target

  // Prevent reverse tabnapping for any link that opens in a new tab.
  const safeRel = isExternal
    ? Array.from(new Set(['noopener', 'noreferrer', ...(rel ? rel.split(/\s+/) : [])]))
        .join(' ')
    : rel

  const cls = [
    'link',
    `link--variant-${variant}`,
    `link--color-${color}`,
    `link--size-${size}`,
    `link--underline-${underline}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={cls} target={safeTarget} rel={safeRel} {...rest}>
      {startIcon ? (
        <span className="link__icon link__icon--start" aria-hidden="true">
          <Icon iconName={startIcon} />
        </span>
      ) : null}
      {children ? <span className="link__label">{children}</span> : null}
      {endIcon ? (
        <span className="link__icon link__icon--end" aria-hidden="true">
          <Icon iconName={endIcon} />
        </span>
      ) : null}
    </a>
  )
}

export type { LinkColor, LinkProps, LinkSize, LinkUnderline, LinkVariant }
