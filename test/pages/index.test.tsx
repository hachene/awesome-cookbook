import { render, screen } from '@testing-library/react';
import Home from '../../pages';

describe('Index', () => {
  it('Index renders the welcome message', () => {
    render(<Home allRecipesData={[]} />);
    const linkElement = screen.getByText(
      /Your best recipes, in a single place!/
    );
    expect(linkElement).toBeVisible;
  });
});
