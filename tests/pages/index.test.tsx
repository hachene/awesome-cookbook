import Home from '@src/pages'
import { render, screen } from '@testing-library/react'

describe('index', () => {
  it('renders the welcome message', () => {
    render(<Home allRecipesData={[]} />)
    const linkElement = screen.queryByText(/Your best recipes, in a single place!/)
    expect(linkElement).toBeVisible()
  })
})
