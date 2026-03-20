import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained', 'icon'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    children: 'Launch campaign',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Button fullWidth>Full width action</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button startIcon="plus">Create</Button>
      <Button variant="outlined" endIcon="arrow-right">Continue</Button>
      <Button variant="text" color="error" startIcon="heart">Favorite</Button>
      <Button
        variant="icon"
        color="primary"
        aria-label="Create item"
        startIcon="plus"
      />
    </div>
  ),
}