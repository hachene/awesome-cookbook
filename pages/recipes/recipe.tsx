import Head from "next/head"
import Link from "next/link"
import { Layout } from "../../components/layout"

export default function Recipe() {
  return (
    <Layout>
      <Head>
        <title>Recipe</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>This is an awesome recipe</h1>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </Layout>
  )
}
