import fs from "fs"
import matter from "gray-matter"
import path from "path"

const recipesDirectory = path.join(process.cwd(), "recipes")

export function getSortedRecipesData(): RecipeData[] {
  const allFileNames = fs.readdirSync(recipesDirectory)
  const validFileNames = allFileNames.filter(fileName => /\.md$/.test(fileName))
  const allRecipesData = validFileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, "")

    const fullPath = path.join(recipesDirectory, fileName)

    const fileContent = fs.readFileSync(fullPath, "utf8")

    const { data: rawFileMetadata } = matter(fileContent)
    const fileHeaderInfo = mapMDMetadataToHeaderInfo(rawFileMetadata)

    return {
      id,
      ...fileHeaderInfo,
    }
  })

  return allRecipesData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function mapMDMetadataToHeaderInfo(fileMetadata: any): HeaderInfo {
  if (!fileMetadata.title || !fileMetadata.date)
    throw new Error("File metadata is invalid. It has to contain title and date")

  return { title: fileMetadata.title, date: fileMetadata.date }
}

type HeaderInfo = {
  title: string
  date: string
}

export type RecipeData = {
  id: string
} & HeaderInfo
