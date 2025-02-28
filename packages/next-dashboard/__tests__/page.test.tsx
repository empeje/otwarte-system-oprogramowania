import { render, screen } from '@testing-library/react'
import Home from '@/app/dashboard-x/page'

describe('Home', () => {
  it('renders heading and links', () => {
    render(<Home />)

    // Check for heading
    const heading = screen.getByRole('heading', { name: /dashboard/i })
    expect(heading).toBeInTheDocument()
    
    // Check for dashboard-x link
    const dashboardLink = screen.getByRole('link', { name: /view dashboard/i })
    expect(dashboardLink).toBeInTheDocument()
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    
    // Check for data link
    const dataLink = screen.getByRole('link', { name: /view sample data/i })
    expect(dataLink).toBeInTheDocument()
    expect(dataLink).toHaveAttribute('href', '/data')
  })
}) 