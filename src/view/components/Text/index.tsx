import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react'
import './text.css'

type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'

type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'

type TextAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify'

type TextColor = 'inherit' | 'text-h' | 'text-p' | 'text-muted' | string

/** Maps each variant to its default semantic HTML tag. */
const VARIANT_TAG: Record<TextVariant, ElementType> = {
  display:   'h1',
  h1:        'h1',
  h2:        'h2',
  h3:        'h3',
  h4:        'h4',
  h5:        'h5',
  h6:        'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1:     'p',
  body2:     'p',
  caption:   'span',
  overline:  'span',
}

/** Token color prop values that map to a CSS modifier class. */
const TOKEN_COLOR_CLASS: Record<string, string> = {
  'text-h':    'text--color-heading',
  'text-p':    'text--color-body',
  'text-muted': 'text--color-muted',
}

/** textTransform values that map to a CSS modifier class. */
const TRANSFORM_CLASS: Partial<Record<string, string>> = {
  uppercase:  'text--uppercase',
  lowercase:  'text--lowercase',
  capitalize: 'text--capitalize',
}

type TextBaseProps = {
  variant?: TextVariant
  as?: ElementType
  children: ReactNode
  color?: TextColor
  weight?: TextWeight
  align?: TextAlign
  display?: CSSProperties['display']
  transform?: CSSProperties['textTransform']
  noWrap?: boolean
  truncate?: boolean
  lineClamp?: number
  gutterBottom?: boolean
  className?: string
  style?: CSSProperties
}

type TextProps<E extends ElementType = 'p'> = TextBaseProps &
  Omit<ComponentPropsWithoutRef<E>, keyof TextBaseProps>

export const Text = <E extends ElementType = 'p',>(props: TextProps<E>) => {
  const {
    variant = 'body1',
    as,
    children,
    color = 'inherit',
    weight,
    align = 'inherit',
    display,
    transform,
    noWrap = false,
    truncate = false,
    lineClamp,
    gutterBottom = false,
    className,
    style,
    ...rest
  } = props

  const Component = (as ?? VARIANT_TAG[variant]) as ElementType

  // Build className from BEM utility classes defined in theme/typography.css.
  const cls = [
    'text',
    `text--${variant}`,
    weight                              && `text--${weight}`,
    color !== 'inherit'                 && TOKEN_COLOR_CLASS[color],
    align !== 'inherit'                 && `text--align-${align}`,
    transform                           && TRANSFORM_CLASS[String(transform)],
    noWrap                              && 'text--no-wrap',
    truncate                            && 'text--truncate',
    gutterBottom                        && 'text--gutter-bottom',
    typeof lineClamp === 'number' && lineClamp > 0 && 'text--line-clamp',
    className,
  ].filter(Boolean).join(' ')

  // Only truly dynamic values that can't be expressed as static CSS classes
  // are passed as inline style.
  const inlineStyle: Record<string, unknown> = {}

  // Custom (non-token) color string
  if (color !== 'inherit' && !TOKEN_COLOR_CLASS[color]) {
    inlineStyle['color'] = color
  }

  // display override
  if (display !== undefined) {
    inlineStyle['display'] = display
  }

  // textTransform value not covered by a modifier class
  if (transform && !TRANSFORM_CLASS[String(transform)]) {
    inlineStyle['textTransform'] = transform
  }

  // Multi-line clamp count — consumed by .text--line-clamp via CSS var
  if (typeof lineClamp === 'number' && lineClamp > 0) {
    inlineStyle['--text-line-clamp-count'] = lineClamp
  }

  if (style) {
    Object.assign(inlineStyle, style)
  }

  const hasInlineStyle = Object.keys(inlineStyle).length > 0

  return (
    <Component
      className={cls}
      style={hasInlineStyle ? (inlineStyle as CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}

export type { TextAlign, TextColor, TextProps, TextVariant, TextWeight }
