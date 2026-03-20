import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './index'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'caption', 'overline',
      ],
      description: 'Typography scale variant',
    },
    color: {
      control: 'select',
      options: ['inherit', 'text-h', 'text-p', 'text-muted'],
      description: 'Text color token',
    },
    weight: {
      control: 'select',
      options: [undefined, 'regular', 'medium', 'semibold', 'bold'],
      description: 'Override variant default weight',
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
    },
    transform: {
      control: 'select',
      options: [undefined, 'uppercase', 'lowercase', 'capitalize', 'none'],
    },
    gutterBottom: { control: 'boolean' },
    truncate:     { control: 'boolean' },
    noWrap:       { control: 'boolean' },
    lineClamp:    { control: 'number' },
    children:     { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Text>

// ── Playground ────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'body1',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

// ── All variants ──────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="display">Display</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text variant="body1">Body 1 — Main content text</Text>
      <Text variant="body2">Body 2 — Secondary content text</Text>
      <Text variant="caption">Caption — Label text</Text>
      <Text variant="overline">Overline — Section label</Text>
    </div>
  ),
}

// ── Colors ────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="body1" color="text-h">Heading color (text-h)</Text>
      <Text variant="body1" color="text-p">Body color (text-p)</Text>
      <Text variant="body1" color="text-muted">Muted color (text-muted)</Text>
      <Text variant="body1" color="#e63946">Custom hex color</Text>
    </div>
  ),
}

// ── Weights ───────────────────────────────────────────────────

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="body1" weight="regular">Regular (400)</Text>
      <Text variant="body1" weight="medium">Medium (500)</Text>
      <Text variant="body1" weight="semibold">Semibold (600)</Text>
      <Text variant="body1" weight="bold">Bold (700)</Text>
    </div>
  ),
}

// ── Alignment ─────────────────────────────────────────────────

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 480 }}>
      <Text variant="body1" align="left">Left aligned text</Text>
      <Text variant="body1" align="center">Center aligned text</Text>
      <Text variant="body1" align="right">Right aligned text</Text>
      <Text variant="body1" align="justify">
        Justify aligned — a longer sentence to demonstrate the justification behaviour across
        multiple words in a block of text.
      </Text>
    </div>
  ),
}

// ── Truncation ────────────────────────────────────────────────

export const Truncate: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <Text variant="body1" truncate>
        This is a very long text that should be truncated with an ellipsis at the end.
      </Text>
    </div>
  ),
}

export const LineClamp: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <Text variant="body1" lineClamp={3}>
        This text will be clamped to three lines. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Curabitur vehicula, libero a fringilla dictum, urna nisl cursus
        quam, vitae convallis risus leo a libero.
      </Text>
    </div>
  ),
}

// ── Polymorphic tag ───────────────────────────────────────────

export const PolymorphicTag: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="h2" as="span">h2 variant rendered as &lt;span&gt;</Text>
      <Text variant="body1" as="label">body1 variant rendered as &lt;label&gt;</Text>
    </div>
  ),
}

// ── Gutter bottom ─────────────────────────────────────────────

export const GutterBottom: Story = {
  render: () => (
    <div>
      <Text variant="h3" gutterBottom>Heading with gutter bottom</Text>
      <Text variant="body1">This paragraph follows the heading above with automatic spacing.</Text>
    </div>
  ),
}
