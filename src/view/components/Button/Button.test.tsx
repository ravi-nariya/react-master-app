import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './index'

describe('Button', () => {
  it('renders a button with contained primary medium styles by default', () => {
    render(<Button>Continue</Button>)

    const button = screen.getByRole('button', { name: 'Continue' })

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass(
      'button',
      'button--variant-contained',
      'button--color-primary',
      'button--size-medium',
    )
  })

  it('applies the requested variant, color and size classes', () => {
    render(
      <Button variant="outlined" color="secondary" size="large">
        Confirm
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveClass(
      'button--variant-outlined',
      'button--color-secondary',
      'button--size-large',
    )
  })

  it('supports full-width layout', () => {
    render(<Button fullWidth>Stretch</Button>)

    expect(screen.getByRole('button', { name: 'Stretch' })).toHaveClass('button--full-width')
  })

  it('forwards click handlers and other HTML attributes', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(
      <Button data-testid="cta" aria-label="Create campaign" onClick={onClick}>
        Create
      </Button>,
    )

    const button = screen.getByTestId('cta')

    await user.click(button)

    expect(button).toHaveAttribute('aria-label', 'Create campaign')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('merges a custom className with component classes', () => {
    render(<Button className="custom-class">Merge</Button>)

    expect(screen.getByRole('button', { name: 'Merge' })).toHaveClass('button', 'custom-class')
  })

  it('respects explicit button types and disabled state', () => {
    render(
      <Button type="submit" disabled>
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()
  })

  it('renders start and end icons', () => {
    render(
      <Button
        startIcon="plus"
        endIcon="arrow-right"
      >
        Add item
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
    expect(document.querySelector('.button__icon--start .icon')).not.toBeNull()
    expect(document.querySelector('.button__icon--end .icon')).not.toBeNull()
    expect(screen.getByText('Add item')).toBeInTheDocument()
  })

  it('supports icon variant for icon-only actions', () => {
    render(
      <Button
        variant="icon"
        aria-label="Add item"
        startIcon="plus"
      />,
    )

    const button = screen.getByRole('button', { name: 'Add item' })

    expect(button).toHaveClass('button--variant-icon')
    expect(button.querySelector('.button__icon .icon')).not.toBeNull()
  })
})