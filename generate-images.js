import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// script to generate distinguishable placeholder images for products with no imgs.

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'db.json')
const publicDir = path.join(__dirname, 'public')

async function generatePlaceholders() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
  const imageUrls = []

  db.products.forEach((product) => {
    if (product.images && product.images.length > 0) {
      imageUrls.push(...product.images)
    }
  })

  const uniqueUrls = [...new Set(imageUrls)]
  console.log(`Found ${uniqueUrls.length} total image paths in db.json.`)

  for (const imgUrl of uniqueUrls) {
    if (!imgUrl.endsWith('.jpg') && !imgUrl.endsWith('.png')) continue

    const fullPath = path.join(publicDir, imgUrl)
    const fileName = path.basename(imgUrl)

    if (fs.existsSync(fullPath)) {
      console.log(`Exists: ${fileName}`)
      continue
    }

    const displayText = fileName.replace(/\.(png|jpg)$/, '').replace(/_/g, ' ')
    const placeholdUrl = `https://placehold.co/600x600/dee87a/2b3a00/png?text=${encodeURIComponent(displayText)}`

    try {
      const response = await fetch(placeholdUrl)
      const buffer = await response.arrayBuffer()

      const dir = path.dirname(fullPath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(fullPath, Buffer.from(buffer))
      console.log(`Downloaded placeholder: ${fileName}`)
    } catch (error) {
      console.error(`Failed to download ${fileName}:`, error.message)
    }
  }

  console.log('Done! All missing images have been generated.')
}

generatePlaceholders()
