import { Layout } from '@src/components/layout'
import { getAllRecipesParamIds, getRecipeData, RecipeData } from '@src/lib/recipes'
import Head from 'next/head'
import Date from '@src/components/date'
import utilStyles from '@src/styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllRecipesParamIds()
  return { paths, fallback: false } // It may be interesting to evaluate fallback = true or blocking (https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required)
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
      <Head>
        <title>{recipeData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{recipeData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={recipeData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: recipeData.recipeContent }} />
    </Layout>
  )
}

type RecipeProps = { recipeData: RecipeData }
