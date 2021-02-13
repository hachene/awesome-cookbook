import { Layout, siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import Head from "next/head"

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Your best recipes, in a single place!</p>
      </section>
    </Layout>
  )
}
