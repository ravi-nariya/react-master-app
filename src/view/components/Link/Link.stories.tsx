import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './index'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'standalone'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    external: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Link>

export const Playground: Story = {
  args: {
    href: '#',
    children: 'Learn more',
    variant: 'default',
    color: 'primary',
    size: 'medium',
    underline: 'hover',
    external: false,
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="subtle">Subtle link</Link>
      <Link href="#" variant="standalone" endIcon="arrow-right">Standalone link</Link>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Link href="#" color="primary">Primary</Link>
      <Link href="#" color="secondary">Secondary</Link>
      <Link href="#" color="success">Success</Link>
      <Link href="#" color="error">Error</Link>
      <Link href="#" color="warning">Warning</Link>
      <Link href="#" color="info">Info</Link>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
      <Link href="#" size="small">Small</Link>
      <Link href="#" size="medium">Medium</Link>
      <Link href="#" size="large">Large</Link>
    </div>
  ),
}

export const UnderlineOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Link href="#" underline="always">Underline always</Link>
      <Link href="#" underline="hover">Underline on hover</Link>
      <Link href="#" underline="none">No underline</Link>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Link href="#" startIcon="info">Read the docs</Link>
      <Link href="#" endIcon="arrow-right" variant="standalone">Continue</Link>
      <Link href="#" startIcon="heart" color="error">Favourites</Link>
    </div>
  ),
}

export const External: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Link href="https://example.com" external endIcon="arrow-right">
        Opens in new tab
      </Link>
      <Link href="https://example.com" external variant="subtle">
        Subtle external link
      </Link>
    </div>
  ),
}
