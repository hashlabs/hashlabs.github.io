import afs from 'async-file';
import fs from 'fs-extra';
import sharp from 'sharp';

const imagesFolder = `${__dirname}/../_assets/img`;
const targetFolder = `${__dirname}/../_assets/optimized_img`;

const options = {
  '1xReduction': 80.0,
  '2xReduction': 90.0
};

/**
 * function for creating an image file using a Sharp image object
 * @function outputImage
 * @param    {Sharp}   sharpImage  - a Sharp object
 * @param    {Number}  percentage  - percentage to reduce from original size
 */
const outputImage = async (sharpImage, {width, outputPath, withoutEnlargement = false}) => {
  try {
    return await sharpImage
      .resize(width)
      .withoutEnlargement(withoutEnlargement)
      .png({
        compressionLevel: 7,
        force: false
      }).jpeg({
        quality: 90,
        force: false
      }).toFile(outputPath);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @function generatePNG
 * This function outputs a png image, and if it's bigger than the original,
 * it just uses the original image as some times reduced png get larger,
 * so this prevents that
 *
 * @param  {string}  outputPath            - path to save the image
 * @param  {number}  width                 - width for the new image
 * @param  {Sharp}   sharpImage            - sharp object representing the image
 * @param  {Object}  originalImageData     - object containing data from the original image
 * @param  {string}  originalImagePath     - original path of the image
 */
const generatePNG = async (sharpImage, { outputPath, width, originalImageData, originalImagePath }) => {
  const image = await outputImage(sharpImage, {
    width,
    outputPath
  });

  const imageData = await afs.stat(outputPath);
  if (imageData.size > originalImageData.size) {
    fs.copySync(originalImagePath, outputPath);
  }
};

/**
 * @function generateImages
 * generates images for a group of images
 * a group is an object containing an image in different retina-friendly sizes
 *
 * @param  {Object}  group
 */
const generateImages = async (group) => {
  try {
    const image = group['3x'];
    const path = `${imagesFolder}/${image.originalName}`;
    const sharpImage = sharp(path);
    const metadata = await sharpImage.metadata();
    const originalImageData = await afs.stat(path);

    const largeImagePath = `${targetFolder}/${image.baseName}@3x.${image.extension}`;
    const mediumImagePath = `${targetFolder}/${image.baseName}@2x.${image.extension}`;
    const smallImagePath = `${targetFolder}/${image.baseName}.${image.extension}`;

    // if all images are defined, just copy them
    if (group['1x'] && group['2x'] && group['3x']) {
      fs.copySync(
        `${imagesFolder}/${group['1x'].originalName}`,
        `${targetFolder}/${group['1x'].baseName}.${group['1x'].extension}`
      );
      fs.copySync(
        `${imagesFolder}/${group['2x'].originalName}`,
        `${targetFolder}/${group['2x'].baseName}@2x.${group['2x'].extension}`
      );
      fs.copySync(
        `${imagesFolder}/${group['3x'].originalName}`,
        `${targetFolder}/${group['3x'].baseName}@3x.${group['3x'].extension}`
      );
      return;
    }

    const smallWidth = Math.round(metadata.width * options['1xReduction'] / 100.0);
    const mediumWidth = Math.round(metadata.width * options['2xReduction'] / 100.0);

    switch (image.extension) {
      case 'png':
        // 1x image generation
        await generatePNG(sharpImage, {
          outputPath: smallImagePath,
          width: smallWidth,
          originalImageData,
          originalImagePath: path
        });
        // 2x image generation
        await generatePNG(sharpImage, {
          outputPath: mediumImagePath,
          width: mediumWidth,
          originalImageData,
          originalImagePath: path
        });
        // 3x image generation
         fs.copySync(path, largeImagePath);
        break;
      default:
        // 1x image generation
        await outputImage(sharpImage, {
          width: Math.round(smallWidth),
          outputPath: smallImagePath
        });
        // 2x image generation
        await outputImage(sharpImage, {
          width: Math.round(mediumWidth),
          outputPath: mediumImagePath
        });
        // 3x image generation
        fs.copySync(path, largeImagePath);
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * @function getBaseName
 * this function returns an object containing the original name of the file,
 * its extension and the basename whitout extension
 *
 * @param  {string} fileName
 */
const getBaseName = (fileName) => {
  const splittedFileName = fileName.split('.');
  return {
    originalName: fileName,
    baseName: splittedFileName[0].split('@')[0],
    extension: splittedFileName[1]
  };
};

/**
 * @function createGroup
 * This function takes an image and returns an object with three properties
 * representing retina-friendly sizes
 *
 * @param  {Array<string>}  images
 */
const createGroup = (images) => {
  const baseImage = images.find(img => !img.originalName.includes('@2x') && !img.originalName.includes('@2x'));
  const twoTimesImage = images.find(img => img.originalName.includes('@2x'));
  const threeTimeImage = images.find(img => img.originalName.includes('@3x'));
  const retinaImagesAvailable = twoTimesImage && threeTimeImage;

  return {
    '1x': retinaImagesAvailable ? baseImage : undefined,
    '2x': retinaImagesAvailable ? twoTimesImage : undefined,
    '3x': retinaImagesAvailable ? threeTimeImage : baseImage
  };
};

/**
 * @function getGroups
 * This function groups images with the same base name
 * (excluding extension and 2x or 3x in name)
 *
 * @param  {string} fileNames
 */
const getGroups = (fileNames) => {
  const sortedFileNames = [...fileNames].sort();
  let images = fileNames.map(getBaseName);
  const groups = [];

  while (images.length > 0) {
    const image = images[0];
    const group = [image];
    const sameImageNames = images.filter(img => img.baseName === image.baseName);
    images = images.filter(img => img.baseName !== image.baseName);
    groups.push(createGroup([image, ...sameImageNames]));
  }

  return groups;
};

const main = async () => {
  try {
    fs.removeSync(targetFolder);
    fs.mkdirsSync(targetFolder);

    const srcFileNames = await afs.readdir(imagesFolder);
    const fileNames = srcFileNames
      .filter(fileName => fileName.endsWith('png') || fileName.endsWith('jpg'));

    const groups = getGroups(fileNames);

    groups.forEach(async (group) => {
      await generateImages(group);
    });

    const svgFiles = srcFileNames.filter(fileName => fileName.endsWith('svg'));
    svgFiles.forEach((fileName) => {
      const path = `${imagesFolder}/${fileName}`;
      const targetPath = `${targetFolder}/${fileName}`;
      fs.copySync(path, targetPath);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
