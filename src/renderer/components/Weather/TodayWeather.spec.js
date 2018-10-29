import { shallowMount } from '@vue/test-utils'

import TodayWeather from './TodayWeather.vue'

describe('TodayWeather', () => {
  it('should display formatted temperature', () => {
    const wrapper = shallowMount(TodayWeather, {
      propsData: {
        day: {
          date: new Date(),
          temperatureMin: '14,5',
          temperatureMax: 16
        }
      }
    })

    expect(wrapper.text()).toContain('14,5 C°')
  })
})
