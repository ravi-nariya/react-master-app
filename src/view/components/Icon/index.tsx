import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faCircleInfo,
  faCircleQuestion,
  faHeart,
  faPlus,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef } from 'react'
import './icon.css'

const ICON_REGISTRY = {
  plus: faPlus,
  'arrow-right': faArrowRight,
  heart: faHeart,
  info: faCircleInfo,
  spinner: faSpinner,
  question: faCircleQuestion,
} as const

type IconName = keyof typeof ICON_REGISTRY

type IconProps = Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> & {
  iconName: IconName
  fallbackIcon?: IconProp
}

export const Icon = ({ className, iconName, fallbackIcon = faCircleQuestion, ...rest }: IconProps) => {
  const cls = ['icon', className].filter(Boolean).join(' ')
  const resolvedIcon = ICON_REGISTRY[iconName] ?? fallbackIcon

  return <FontAwesomeIcon className={cls} icon={resolvedIcon} {...rest} />
}

export type { IconName, IconProps }