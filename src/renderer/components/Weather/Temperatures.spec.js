import { shallowMount } from '@vue/test-utils'

import Temperatures from './Temperatures.vue'

describe('Temperatures', () => {
  it('should display formatted temperature', () => {
    const wrapper = shallowMount(Temperatures, {
      propsData: {
        day: {
          date: new Date(),
          temperatureMin: '14,5',
          temperatureMax: 16
        }
      }
    })

    expect(wrapper.text()).toContain('14,5°C 16°C')
  })
})
