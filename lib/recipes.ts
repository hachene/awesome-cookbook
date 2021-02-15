import fs from "fs"
import matter from "gray-matter"
import path from "path"
import remark from "remark"
import html from "remark-html"

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

  return allRecipesData.sort((a, b) => (a.date < b.date ? 1 : -1)) as any // FIXME: Remove this any
}

export function getAllRecipesParamIds(): RecipeParamId[] {
  const fileNames = getAllMDFileNamesFromDirectory(recipesDirectory)
  return fileNames.map(fileName => ({ params: { id: removeMDExtension(fileName) } }))
}

export async function getRecipeData(id: string): Promise<RecipeData> {
  const fullPath = path.join(recipesDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, "utf8")

  const { data: rawFileMetadata, content: rawFileContent } = matter(fileContent)
  const fileHeaderInfo = mapMDMetadataToHeaderInfo(rawFileMetadata)
  const recipeContent = await mapMDContentToRecipeInfo(rawFileContent)

  return { id, recipeContent, ...fileHeaderInfo }
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

async function mapMDContentToRecipeInfo(rawContent: string): Promise<RecipeInfo> {
  const processedContent = await remark().use(html).process(rawContent)
  return processedContent.toString()
}

type HeaderInfo = {
  title: string
  date: string
}
type RecipeInfo = string

export type RecipeData = {
  id: string
  title: string
  date: string
  recipeContent: string
}

type RecipeParamId = {
  params: {
    id: string
  }
}
