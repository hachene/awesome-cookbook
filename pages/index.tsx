import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Cookbook</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello production!</h1>
        <Image
          src='/images/profile.jpg'
          height={144}
          width={144}
          alt='A dummy image showing a white abstract pattern'
        />
        <Link href='/recipes/recipe'>
          <a>Go to the recipe</a>
        </Link>
      </main>
    </div>
  )
}
