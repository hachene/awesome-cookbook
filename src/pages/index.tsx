import { Layout, siteTitle } from '@src/components/layout'
import utilStyles from '../styles/utils.module.css'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getSortedRecipesData, RecipeData } from '@src/lib/recipes'

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allRecipesData = getSortedRecipesData()
  return {
    props: { allRecipesData },
  }
}

export default function Home({ allRecipesData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Your best recipes, in a single place!</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allRecipesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

type HomeProps = {
  allRecipesData: RecipeData[]
}
