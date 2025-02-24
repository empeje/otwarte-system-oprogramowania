import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
    
    const image = screen.getByAltText('Next.js logo')
    expect(image).toBeInTheDocument()
  })
}) 