import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Link } from './index'

describe('Link', () => {
  describe('defaults', () => {
    it('renders an anchor with correct default classes', () => {
      render(<Link href="/home">Home</Link>)

      const link = screen.getByRole('link', { name: 'Home' })

      expect(link).toHaveAttribute('href', '/home')
      expect(link).toHaveClass(
        'link',
        'link--variant-default',
        'link--color-primary',
        'link--size-medium',
        'link--underline-hover',
      )
    })

    it('wraps children in a label span', () => {
      render(<Link href="/home">Home</Link>)

      expect(document.querySelector('.link__label')).toHaveTextContent('Home')
    })
  })

  describe('variants, colors, sizes and underline', () => {
    it('applies requested variant class', () => {
      render(<Link href="#" variant="standalone">Go</Link>)

      expect(screen.getByRole('link', { name: 'Go' })).toHaveClass('link--variant-standalone')
    })

    it('applies requested color class', () => {
      render(<Link href="#" color="error">Delete</Link>)

      expect(screen.getByRole('link', { name: 'Delete' })).toHaveClass('link--color-error')
    })

    it('applies requested size class', () => {
      render(<Link href="#" size="large">Large</Link>)

      expect(screen.getByRole('link', { name: 'Large' })).toHaveClass('link--size-large')
    })

    it('applies underline-always class', () => {
      render(<Link href="#" underline="always">Always</Link>)

      expect(screen.getByRole('link', { name: 'Always' })).toHaveClass('link--underline-always')
    })

    it('applies underline-none class', () => {
      render(<Link href="#" underline="none">None</Link>)

      expect(screen.getByRole('link', { name: 'None' })).toHaveClass('link--underline-none')
    })
  })

  describe('external links', () => {
    it('sets target="_blank" and secure rel when external=true', () => {
      render(<Link href="https://example.com" external>Visit</Link>)

      const link = screen.getByRole('link', { name: 'Visit' })

      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    })

    it('adds secure rel when target="_blank" is passed directly', () => {
      render(<Link href="https://example.com" target="_blank">Open</Link>)

      const link = screen.getByRole('link', { name: 'Open' })

      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    })

    it('preserves extra rel values alongside security tokens', () => {
      render(
        <Link href="https://example.com" external rel="sponsored">
          Sponsor
        </Link>,
      )

      const rel = screen.getByRole('link', { name: 'Sponsor' }).getAttribute('rel') ?? ''
      const tokens = rel.split(' ')

      expect(tokens).toContain('noopener')
      expect(tokens).toContain('noreferrer')
      expect(tokens).toContain('sponsored')
    })

    it('does not set target or modify rel for internal links', () => {
      render(<Link href="/about">About</Link>)

      const link = screen.getByRole('link', { name: 'About' })

      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })
  })

  describe('icons', () => {
    it('renders start icon wrapper', () => {
      render(<Link href="#" startIcon="plus">Add</Link>)

      expect(document.querySelector('.link__icon--start')).not.toBeNull()
    })

    it('renders end icon wrapper', () => {
      render(<Link href="#" endIcon="arrow-right">Continue</Link>)

      expect(document.querySelector('.link__icon--end')).not.toBeNull()
    })

    it('renders both start and end icons', () => {
      render(
        <Link href="#" startIcon="heart" endIcon="arrow-right">
          Favourite
        </Link>,
      )

      expect(document.querySelector('.link__icon--start')).not.toBeNull()
      expect(document.querySelector('.link__icon--end')).not.toBeNull()
    })

    it('marks icon spans as aria-hidden', () => {
      render(<Link href="#" startIcon="info">Info</Link>)

      expect(document.querySelector('.link__icon--start')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('HTML attributes passthrough', () => {
    it('merges a custom className', () => {
      render(<Link href="#" className="custom">Label</Link>)

      expect(screen.getByRole('link', { name: 'Label' })).toHaveClass('link', 'custom')
    })

    it('forwards data attributes and aria-label', () => {
      render(
        <Link href="/doc" data-testid="doc-link" aria-label="Open documentation">
          Docs
        </Link>,
      )

      const link = screen.getByTestId('doc-link')

      expect(link).toHaveAttribute('aria-label', 'Open documentation')
    })

    it('fires click handler', async () => {
      const onClick = jest.fn()
      const user = userEvent.setup()

      render(
        <Link href="#" onClick={onClick}>
          Click me
        </Link>,
      )

      await user.click(screen.getByRole('link', { name: 'Click me' }))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Link href="/home">Go home</Link>)

      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations for external link', async () => {
      const { container } = render(
        <Link href="https://example.com" external>
          External site
        </Link>,
      )

      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with start and end icons', async () => {
      const { container } = render(
        <Link href="#" startIcon="info" endIcon="arrow-right">
          Learn more
        </Link>,
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
