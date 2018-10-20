import {
  SET_INTERVAL,
  SET_CURRENT_FRAME,
  SET_LOAD_IMAGES_SAMPLE,
  SET_IMAGES_SAMPLE,
  PUSH_IMAGE_TO_IMAGES_SAMPLE
} from './mutation-types'

export default {
  [SET_INTERVAL]: (state, interval) => (state.cameraInterval = interval), // eslint-disable-line
  [SET_CURRENT_FRAME]: (state, frame) => (state.currentFrame = frame), // eslint-disable-line
  [SET_LOAD_IMAGES_SAMPLE]: (state, value) => (state.loadImagesSample = value), // eslint-disable-line
  // eslint-disable-next-line
  [SET_IMAGES_SAMPLE]: (state, imagesSample) =>
    (state.imagesSample = imagesSample),
  [PUSH_IMAGE_TO_IMAGES_SAMPLE]: (state, image) =>
    state.imagesSample.push(image)
}
