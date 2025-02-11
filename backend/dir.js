const { dialog } = require('electron');
const fs = require('fs/promises');
const path = require('path');

function openDirectory() {
  return dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then(result => {
      if (!result.canceled) {
        const folderPath = result.filePaths[0];
        return folderPath;
      }
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

async function readImagesFromDirectory(folder) {
  try {
    const files = await fs.readdir(folder);
    const images = files.filter(imageFilter);
    return images;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const LOCAL_FOLDER = '../src/public';
class Image {
  constructor(folder, name) {
    this.folder = folder;
    this.name = name;
    this.fullPath = path.join(this.folder, this.name);
    this.ext = path.extname(name).toLowerCase();

    this.relativeLocalPath = `${LOCAL_FOLDER}/${name}`;
    this.localPath = path.resolve(__dirname, this.relativeLocalPath);
  }

  async copyToLocal() {
    await fs.copyFile(this.fullPath, this.localPath);
  }
}

async function getImages() {
  let response = { folder: null, images: [], err: null };
  const folder = await openDirectory();
  if (!folder) return { ...response, err: `Can't open chosen directory` };

  const imgFiles = await readImagesFromDirectory(folder);
  if (!imgFiles)
    return { ...response, err: `Can't read files from this directory` };

  const images = imgFiles.map(i => new Image(folder, i));
  response = { ...response, folder, images };

  if (process.env.DEV) {
    await clearLocalDir();
    await Promise.all(images.map(img => img.copyToLocal()));
  }

  return response;
}

const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
function imageFilter(file) {
  const ext = path.extname(file).toLowerCase();
  return IMG_EXTENSIONS.includes(ext);
}

async function clearLocalDir() {
  const folder = path.resolve(__dirname, LOCAL_FOLDER);
  await fs.rm(folder, { recursive: true, force: true });
  await fs.mkdir(folder);
}

module.exports = { getImages };
