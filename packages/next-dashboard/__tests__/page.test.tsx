import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders heading and link', () => {
    render(<Home />)

    // Check for heading
    const heading = screen.getByRole('heading', { name: /dashboard/i })
    expect(heading).toBeInTheDocument()
    
    // Check for link to data page
    const link = screen.getByRole('link', { name: /view sample data/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/data')
  })
}) 