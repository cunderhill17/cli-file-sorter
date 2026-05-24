const { access, rename } = require('fs/promises');
const path = require('path');



async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function renameWithSequence(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);

  let i = 1;
  let newPath;

  while (true) {
    const suffix = String(i).padStart(2, "0");
    newPath = path.join(dir, `${base}-${suffix}${ext}`);

    if (!(await fileExists(newPath))) {
      break;
    }

    i++;
  }

  return newPath;
}

module.exports = {
    renameWithSequence
}