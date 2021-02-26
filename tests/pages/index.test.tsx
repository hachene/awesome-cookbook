import Home from '@src/pages'
import { render, screen } from '@testing-library/react'

describe('index', () => {
  it('index renders the welcome message', () => {
    render(<Home allRecipesData={[]} />)
    const linkElement = screen.getByText(/Your best recipes, in a single place!/)
    expect(linkElement).toBeVisible()
  })
})
