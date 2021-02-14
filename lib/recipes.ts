import fs from "fs"
import matter from "gray-matter"
import path from "path"

const recipesDirectory = path.join(process.cwd(), "recipes")

export function getSortedRecipesData(): RecipeData[] {
  const fileNames = getAllMDFileNamesFromDirectory(recipesDirectory)
  const allRecipesData = fileNames.map(fileName => {
    const id = removeMDExtension(fileName)

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

export function getAllRecipesParamIds(): RecipeParamId[] {
  const fileNames = getAllMDFileNamesFromDirectory(recipesDirectory)
  return fileNames.map(fileName => ({ params: { id: removeMDExtension(fileName) } }))
}

export function getRecipeData(id: string): RecipeData {
  const fullPath = path.join(recipesDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, "utf8")

  const { data: rawFileMetadata } = matter(fileContent)
  const fileHeaderInfo = mapMDMetadataToHeaderInfo(rawFileMetadata)

  return { id, ...fileHeaderInfo }
}

function getAllMDFileNamesFromDirectory(directoryName: string): string[] {
  const MDfileRegex = /\.md$/
  const allFileNames = fs.readdirSync(directoryName)
  return allFileNames.filter(fileName => MDfileRegex.test(fileName))
}

function removeMDExtension(fileName: string): string {
  return fileName.replace(/\.md$/, "")
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

type RecipeParamId = {
  params: {
    id: string
  }
}
