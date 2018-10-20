import * as cv from 'opencv4nodejs'
import { HOME_ASSISTANT_CLASSIFIER_PATH } from './constants'

let classifier = null

const initClassifier = () => {
  classifier = new cv.CascadeClassifier(HOME_ASSISTANT_CLASSIFIER_PATH)
}

const getClassifier = () => classifier

export { initClassifier, getClassifier }
