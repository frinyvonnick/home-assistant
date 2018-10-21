import * as cv from 'opencv4nodejs'
import fs from 'fs'
import { getResizedGrayFaceFromImgSync } from './extract-face-from-img'
import { HOME_ASSISTANT_TRAINER_IMGS_FOLDER_PATH } from './constants'

const recognizer = new cv.LBPHFaceRecognizer()

/**
 * Get trainer faces images from the trainerImgFilesNames
 * @param {Array} trainerImgFilesNames
 */
const getTrainerFaces = trainerImgFilesNames =>
  trainerImgFilesNames.map(imgFileName => {
    const imgPath = `${HOME_ASSISTANT_TRAINER_IMGS_FOLDER_PATH}${imgFileName}`
    const img = cv.imread(imgPath)

    return getResizedGrayFaceFromImgSync(img)
  })

/**
 * Configure the recognizer from persons data
 * @param {Array} persons
 */
const configureRecognizer = persons => {
  const trainerImgFilesNames = fs.readdirSync(
    HOME_ASSISTANT_TRAINER_IMGS_FOLDER_PATH
  )

  const trainerFaces = getTrainerFaces(trainerImgFilesNames)

  const labels = trainerImgFilesNames.map(fileName =>
    persons.findIndex(person => fileName.includes(person.fileNamePrefix))
  )

  recognizer.train(trainerFaces, labels)
}

export { recognizer, configureRecognizer, getTrainerFaces }
