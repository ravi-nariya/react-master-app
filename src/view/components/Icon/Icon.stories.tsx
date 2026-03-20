import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './index'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: ['plus', 'arrow-right', 'heart', 'info', 'spinner', 'question'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  args: {
    iconName: 'info',
    size: 'lg',
  },
}

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon iconName="heart" size="lg" />
      <Icon iconName="info" size="lg" />
      <Icon iconName="arrow-right" size="lg" />
      <Icon iconName="spinner" spin size="lg" />
    </div>
  ),
}