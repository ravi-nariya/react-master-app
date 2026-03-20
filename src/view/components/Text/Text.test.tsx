import { render, screen } from '@testing-library/react'
import { Text } from './index'

describe('Text', () => {
  it('renders body text by default as a <p> tag', () => {
    render(<Text>Default body</Text>)

    const el = screen.getByText('Default body')

    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text', 'text--body1')
  })

  it('applies heading variant classes and semantic tag', () => {
    render(<Text variant="h2">Section title</Text>)

    const el = screen.getByRole('heading', { level: 2, name: 'Section title' })

    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('text', 'text--h2')
  })

  it('allows the rendered tag to be overridden with as prop', () => {
    render(
      <Text variant="h1" as="span">
        Heading as span
      </Text>,
    )

    const el = screen.getByText('Heading as span')

    expect(el.tagName).toBe('SPAN')
    expect(el).toHaveClass('text', 'text--h1')
  })

  it('applies color modifier class for token colors', () => {
    render(<Text color="text-muted">Muted text</Text>)

    expect(screen.getByText('Muted text')).toHaveClass('text--color-muted')
  })

  it('sets color as inline style for custom (non-token) color values', () => {
    render(<Text color="#ff0000">Custom color</Text>)

    expect(screen.getByText('Custom color')).toHaveStyle({ color: '#ff0000' })
  })

  it('applies weight modifier class', () => {
    render(<Text weight="bold">Bold text</Text>)

    expect(screen.getByText('Bold text')).toHaveClass('text--bold')
  })

  it('applies alignment modifier class', () => {
    render(<Text align="center">Centered</Text>)

    expect(screen.getByText('Centered')).toHaveClass('text--align-center')
  })

  it('applies truncate utility class', () => {
    render(<Text truncate>Long truncated text</Text>)

    expect(screen.getByText('Long truncated text')).toHaveClass('text--truncate')
  })

  it('applies no-wrap utility class', () => {
    render(<Text noWrap>No wrap text</Text>)

    expect(screen.getByText('No wrap text')).toHaveClass('text--no-wrap')
  })

  it('applies gutter-bottom utility class', () => {
    render(<Text gutterBottom>Spaced text</Text>)

    expect(screen.getByText('Spaced text')).toHaveClass('text--gutter-bottom')
  })

  it('applies line-clamp class and sets CSS variable via inline style', () => {
    render(<Text lineClamp={3}>Clamped content</Text>)

    const el = screen.getByText('Clamped content')

    expect(el).toHaveClass('text--line-clamp')
    expect(el.style.getPropertyValue('--text-line-clamp-count')).toBe('3')
  })

  it('applies transform modifier class for standard text transforms', () => {
    render(<Text transform="uppercase">Uppercased</Text>)

    expect(screen.getByText('Uppercased')).toHaveClass('text--uppercase')
  })

  it('forwards extra HTML attributes to the root element', () => {
    render(
      <Text data-testid="custom-attr" aria-label="accessible label">
        Attr text
      </Text>,
    )

    const el = screen.getByTestId('custom-attr')

    expect(el).toHaveAttribute('aria-label', 'accessible label')
  })

  it('merges a consumer className with the component classes', () => {
    render(<Text className="my-class">Merged</Text>)

    const el = screen.getByText('Merged')

    expect(el).toHaveClass('text', 'text--body1', 'my-class')
  })
})

