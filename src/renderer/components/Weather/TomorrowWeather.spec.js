import { shallowMount } from '@vue/test-utils'

import TomorrowWeather from './TomorrowWeather.vue'

describe('TomorrowWeather', () => {
  it('should display formatted temperature', () => {
    const wrapper = shallowMount(TomorrowWeather, {
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
