import { render } from "@testing-library/react"
import Home from "../../pages"

describe("Index", () => {
  it("Index renders the welcome message", () => {
    const app = render(<Home allRecipesData={[]} />)
    expect(app.queryByText(/Your best recipes, in a single app!/)).toBeVisible
  })
})
