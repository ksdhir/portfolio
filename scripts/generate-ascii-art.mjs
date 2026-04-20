/**
 * Generates data/ascii-art.json from famous public-domain paintings.
 * Requires internet access. Run with: node scripts/generate-ascii-art.mjs
 *
 * Uses asciify-image (already a devDependency) to convert images to ASCII.
 * Images are sourced from Wikimedia Commons (all public domain).
 */

import asciify from 'asciify-image'
import https from 'https'
import http from 'http'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT = path.join(__dirname, '../data/ascii-art.json')

// All images from Wikimedia Commons — public domain
const ARTWORKS = [
  {
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
  {
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    title: 'The Scream',
    artist: 'Edvard Munch',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/200px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
  },
  {
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/300px-Tsunami_by_hokusai_19th_century.jpg',
  },
  {
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/200px-1665_Girl_with_a_Pearl_Earring.jpg',
  },
  {
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/300px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
  },
  {
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    url: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
  },
  {
    title: 'American Gothic',
    artist: 'Grant Wood',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/200px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const client = url.startsWith('https') ? https : http
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err) })
  })
}

const pieces = []

for (const artwork of ARTWORKS) {
  const tmpFile = path.join(os.tmpdir(), `ascii-art-${Date.now()}.jpg`)
  process.stdout.write(`Generating: ${artwork.title}...`)
  try {
    await download(artwork.url, tmpFile)
    const art = await asciify(tmpFile, { fit: 'box', width: 80, height: 35, color: false })
    fs.unlinkSync(tmpFile)
    pieces.push({ title: artwork.title, artist: artwork.artist, art })
    console.log(' done')
  } catch (err) {
    console.log(` FAILED: ${err.message}`)
    fs.unlink(tmpFile, () => {})
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(pieces, null, 2))
console.log(`\nWrote ${pieces.length} pieces to ${OUTPUT}`)
