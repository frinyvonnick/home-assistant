import { shallowMount } from '@vue/test-utils'

import DayWeather from './DayWeather.vue'

describe('DayWeather', () => {
  it('should display formatted temperature', () => {
    const wrapper = shallowMount(DayWeather, {
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
