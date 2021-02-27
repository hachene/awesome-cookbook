import { render, screen } from '@testing-library/react'
import Home from '../../pages'

describe('index', () => {
  it('index renders the welcome message', () => {
    render(<Home allRecipesData={[]} />)
    const linkElement = screen.queryByText(/Your best recipes, in a single place!/)
    expect(linkElement).toBeVisible()
  })
})
