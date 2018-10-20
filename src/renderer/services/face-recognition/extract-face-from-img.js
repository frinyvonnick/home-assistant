import classifier from './classifier'
import { ERROR_MUTLI_SCALE_DETECTION } from './constants'

/**
 * Get the the first gray face img on grayImg
 * from faceRects
 * @param {Object} grayImg
 * @param {Array} faceRects
 */
const getGrayFaceImgFromRects = (grayImg, faceRects) => {
  const grayFaceImg = grayImg.getRegion(faceRects[0])
  return grayFaceImg.resize(80, 80)
}

/**
 * Get resized gray face from img
 * @param {Object} context
 * @param {Object} payload
 */
const getResizedGrayFaceFromImgAsync = async img => {
  const grayImg = img.bgrToGray()
  const multiScale = await classifier.detectMultiScaleAsync(grayImg)
  const faceRects = multiScale.objects
  if (!faceRects.length) throw new Error(ERROR_MUTLI_SCALE_DETECTION)

  return getGrayFaceImgFromRects(grayImg, faceRects)
}

/**
 * Get resized gray face from img
 * @param {Object} context
 * @param {Object} payload
 */
const getResizedGrayFaceFromImgSync = img => {
  const grayImg = img.bgrToGray()
  const multiScale = classifier.detectMultiScale(grayImg)
  const faceRects = multiScale.objects
  if (!faceRects.length) throw new Error(ERROR_MUTLI_SCALE_DETECTION)

  return getGrayFaceImgFromRects(grayImg, faceRects)
}

export { getResizedGrayFaceFromImgAsync, getResizedGrayFaceFromImgSync }
