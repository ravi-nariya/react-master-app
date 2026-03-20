import { render, screen } from '@testing-library/react'
import { Icon } from './index'

describe('Icon', () => {
  it('renders a Font Awesome icon', () => {
    render(<Icon iconName="plus" data-testid="plus-icon" />)

    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(<Icon iconName="plus" className="custom-icon" data-testid="plus-icon" />)

    expect(screen.getByTestId('plus-icon')).toHaveClass('icon', 'custom-icon')
  })
})