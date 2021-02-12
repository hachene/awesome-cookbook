import Link from "next/link"

export default function Recipe() {
  return (
    <>
      <h1>This is an awesome recipe</h1>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </>
  )
}
