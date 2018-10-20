import * as cv from 'opencv4nodejs'
import { HOME_ASSISTANT_CLASSIFIER_PATH } from './constants'

export default new cv.CascadeClassifier(HOME_ASSISTANT_CLASSIFIER_PATH)
