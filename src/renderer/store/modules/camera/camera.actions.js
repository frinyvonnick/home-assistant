import * as cv from 'opencv4nodejs'
import {
  SET_INTERVAL,
  SET_CURRENT_FRAME,
  SET_LOAD_IMAGES_SAMPLE,
  PUSH_IMAGE_TO_IMAGES_SAMPLE,
  SET_IMAGES_SAMPLE
} from './mutation-types'

/**
 * Start images sample loading
 * @param {Object} context
 */
const startImagesSampleLoading = ({ commit }) =>
  commit(SET_LOAD_IMAGES_SAMPLE, true)

/**
 * Start images sample loading
 * @param {Object} context
 */
const resetImagesSample = ({ commit }) => commit(SET_IMAGES_SAMPLE, [])

/**
 * Start camera
 * @param {Object} context
 * @param {Object} payload
 */
const startCamera = ({ commit, state }) => {
  const outputFrameHeight = state.frameHeight
  const outputFrameWidth = state.frameWidth
  const devicePort = 0
  const vCap = new cv.VideoCapture(devicePort)

  const interval = setInterval(() => {
    const frame = vCap.read()
    const resizedFrame = frame.resize(outputFrameHeight, outputFrameWidth)
    commit(SET_CURRENT_FRAME, resizedFrame)

    if (state.loadImagesSample) {
      if (state.imagesSample.length < state.imagesSampleSize) {
        commit(PUSH_IMAGE_TO_IMAGES_SAMPLE, resizedFrame)
      } else {
        commit(SET_LOAD_IMAGES_SAMPLE, false)
        commit(SET_IMAGES_SAMPLE, [])
      }
    }
  })

  commit(SET_INTERVAL, interval)
}

/**
 * Stop camera
 * @param {Object} context
 */
const stopCamera = ({ state, commit }) => {
  clearInterval(state.cameraInterval)
  commit(SET_CURRENT_FRAME, null)
}

export default {
  startCamera,
  stopCamera,
  startImagesSampleLoading,
  resetImagesSample
}
