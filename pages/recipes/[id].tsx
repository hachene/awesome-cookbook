import { Layout } from "../../components/layout"
import { getAllRecipesParamIds, getRecipeData, RecipeData } from "../../lib/recipes"

export async function getStaticPaths() {
  const paths = getAllRecipesParamIds()
  return { paths, fallback: false }
}

// TODO: Add type safety here
export async function getStaticProps({ params }: any) {
  const recipeData = getRecipeData(params.id)
  return {
    props: { recipeData },
  }
}

export default function Recipe({ recipeData }: RecipeProps) {
  return (
    <Layout>
      {recipeData.title}
      <br />
      {recipeData.date}
    </Layout>
  )
}

type RecipeProps = { recipeData: RecipeData }
