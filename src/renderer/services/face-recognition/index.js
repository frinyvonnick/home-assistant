import {
  flow,
  countBy,
  entries,
  partialRight,
  maxBy,
  head,
  isNil,
  meanBy
} from 'lodash'
import {
  createHomeAssistantTmpFolders,
  copySharedAssetsToHomeAssistantTmpFolders
} from './share-assets-with-opencv'
import { initClassifier } from './classifier'
import { configureRecognizer, recognizer } from './recognizer'
import { getResizedGrayFaceFromImgAsync } from './extract-face-from-img'

let personsData = null

/**
 * Compare the grayResizedFace with
 * the recognizer database.
 * Return the identified person with a confidence indication
 * @param {Object} grayResizedFace
 */
const runPrediction = grayResizedFace => {
  const result = recognizer.predict(grayResizedFace)
  if (isNil(result) || result.label === -1) return null

  return {
    person: personsData[result.label],
    confidence: result.confidence
  }
}

/**
 * Get the face from the image and run the prediction
 * Return the identified person
 * @param {Object} img
 */
const getPersonFromImage = async img => {
  if (isNil(personsData)) {
    throw new Error(`You must call face-recognition 'init' method first`)
  }

  try {
    const grayResizedFace = await getResizedGrayFaceFromImgAsync(img)
    return runPrediction(grayResizedFace)
  } catch (err) {
    return null
  }
}

/**
 * Get the most likely person from the images sample.
 * Return the identified person with a confidence indication
 * @param {Array} imgSample
 */
const getMostLikelyPersonOnImagesSample = async imgSample => {
  const promises = imgSample.map(img => getPersonFromImage(img))

  return Promise.all(promises).then(results => {
    const personFirstname = flow(
      countBy,
      entries,
      partialRight(maxBy, '[1]'),
      head
    )(results.map(result => (result ? result.person.firstname : null)))

    const person = personsData.find(
      person => person.firstname === personFirstname
    )

    return {
      person,
      confidence: person ? meanBy(results, 'confidence') : null
    }
  })
}

/**
 * Init face recognition
 * Create and copy assets needed by opencv
 * to the current devices and configure the recognizer
 * @param {Array} persons
 */
const init = persons => {
  personsData = persons

  // Allow to share files (classifier + trainer images) with openCV
  createHomeAssistantTmpFolders()
  copySharedAssetsToHomeAssistantTmpFolders()

  // Load classifier
  initClassifier()

  // Configure trainers for face recognition
  configureRecognizer(personsData)
}

export default {
  init,
  getPersonFromImage,
  getMostLikelyPersonOnImagesSample,
  runPrediction
}
