import type { App } from 'vue'
import DvFullScreenContainer from './components/DvFullScreenContainer.vue'
import DvTimer from './components/DvTimer.vue'
import DvButton from './components/DvButton.vue'
import {
  DvBorderBox1,
  DvBorderBox2,
  DvBorderBox3,
  DvBorderBox4,
  DvBorderBox5,
  DvBorderBox6,
  DvBorderBox7,
  DvBorderBox8,
  DvBorderBox9,
  DvBorderBox10,
  DvBorderBox11,
  DvBorderBox12,
  DvBorderBox13,
  DvBorderBox14,
} from './components/borderBox'

export {
  DvFullScreenContainer,
  DvTimer,
  DvButton,
  DvBorderBox1,
  DvBorderBox2,
  DvBorderBox3,
  DvBorderBox4,
  DvBorderBox5,
  DvBorderBox6,
  DvBorderBox7,
  DvBorderBox8,
  DvBorderBox9,
  DvBorderBox10,
  DvBorderBox11,
  DvBorderBox12,
  DvBorderBox13,
  DvBorderBox14,
}

export default function (app: App) {
  app.component('DvFullScreenContainer', DvFullScreenContainer)
  app.component('DvTimer', DvTimer)
  app.component('DvButton', DvButton)
  app.component('DvBorderBox1', DvBorderBox1)
  app.component('DvBorderBox2', DvBorderBox2)
  app.component('DvBorderBox3', DvBorderBox3)
  app.component('DvBorderBox4', DvBorderBox4)
  app.component('DvBorderBox5', DvBorderBox5)
  app.component('DvBorderBox6', DvBorderBox6)
  app.component('DvBorderBox7', DvBorderBox7)
  app.component('DvBorderBox8', DvBorderBox8)
  app.component('DvBorderBox9', DvBorderBox9)
  app.component('DvBorderBox10', DvBorderBox10)
  app.component('DvBorderBox11', DvBorderBox11)
  app.component('DvBorderBox12', DvBorderBox12)
  app.component('DvBorderBox13', DvBorderBox13)
  app.component('DvBorderBox14', DvBorderBox14)
}
