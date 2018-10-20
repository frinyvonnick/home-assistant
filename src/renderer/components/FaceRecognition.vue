<template>
  <div class="fr-wrapper">
    <div v-if="alertMsg" class="alert">
      {{ alertMsg }}
    </div>
    <div class="identify-btn" @click="startImagesSampleLoading">Identify</div>
    <canvas ref="cameraCanvas" :height="frameHeight" :width="frameWidth"></canvas>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import faceRecognition from '@/services/face-recognition'

export default {
  data: () => ({ alertMsg: null }),
  mounted() {
    const persons = [
      {
        firstname: 'franck',
        lastname: 'abgrall',
        fileNamePrefix: 'franckabgrall'
      }
    ]
    faceRecognition.init(persons)
    this.startCamera()
  },
  computed: {
    ...mapState('camera', [
      'currentFrame',
      'imagesSample',
      'frameHeight',
      'frameWidth'
    ]),
    ...mapGetters('camera', ['isImagesSampleReady', 'currentFrameAsImageData'])
  },
  methods: {
    ...mapActions('camera', [
      'startCamera',
      'stopCamera',
      'startImagesSampleLoading'
    ])
  },
  watch: {
    currentFrameAsImageData(imgData) {
      if (!imgData) return

      const canvas = this.$refs.cameraCanvas
      const ctx = canvas.getContext('2d')
      ctx.putImageData(imgData, 0, 0)
    },
    isImagesSampleReady(isReady) {
      if (!isReady) return
      faceRecognition
        .getMostLikelyPersonOnImagesSample(this.imagesSample)
        .then(result => {
          if (result.person) {
            this.alertMsg = `Hello ${result.person.firstname}`
            setTimeout(() => (this.alertMsg = null), 5000) // eslint-disable-line
            console.log(result.person.firstname, result.confidence)
          } else {
            this.alertMsg = `Identification failed`
            setTimeout(() => (this.alertMsg = null), 5000) // eslint-disable-line
          }
        })
    }
  },
  beforeDestroy() {
    this.stopCamera()
  }
}
</script>

<style scoped>
.fr-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.identify-btn {
  cursor: pointer;
  position: absolute;
  padding: 10px 15px;
  background: #6ad6da;
  top: 10px;
  left: 10px;
}

.alert {
  text-align: center;
  padding: 10px 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  background: #2cbe4e;
}
</style>
