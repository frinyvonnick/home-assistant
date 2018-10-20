import * as cv from 'opencv4nodejs'

export default {
  isImagesSampleReady: state =>
    state.imagesSample.length >= state.imagesSampleSize,

  currentFrameAsImageData: state => {
    if (!state.currentFrame) return null

    const matRGBA =
      state.currentFrame.channels === 1
        ? state.currentFrame.cvtColor(cv.COLOR_GRAY2RGBA)
        : state.currentFrame.cvtColor(cv.COLOR_BGR2RGBA)
    return new ImageData(
      new Uint8ClampedArray(matRGBA.getData()),
      state.currentFrame.cols,
      state.currentFrame.rows
    )
  }
}
