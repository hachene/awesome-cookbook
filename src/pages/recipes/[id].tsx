import { Layout } from '@src/components/layout'
import { getAllRecipesParamIds, getRecipeData, RecipeData } from '@src/lib/recipes'

export async function getStaticPaths() {
  const paths = getAllRecipesParamIds()
  return { paths, fallback: false }
}

// TODO: Add type safety here
export async function getStaticProps({ params }: any) {
  const recipeData = await getRecipeData(params.id)
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
      <br />
      <div dangerouslySetInnerHTML={{ __html: recipeData.recipeContent }} />
    </Layout>
  )
}

type RecipeProps = { recipeData: RecipeData }
