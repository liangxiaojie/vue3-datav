import type { App } from 'vue'
import DvFullScreenContainer from './components/DvFullScreenContainer.vue'
import DvTimer from './components/DvTimer.vue'

export { DvFullScreenContainer, DvTimer }

export default function (app: App) {
  app.component('DvFullScreenContainer', DvFullScreenContainer)
  app.component('DvTimer', DvTimer)
}
