import { getWeatherFor } from './meteo'

const data = [
  {
    weather: [{ id: 800, main: 'Clear' }],
    dt_txt: '2018-10-12 12:00:00'
  },
  {
    weather: [{ id: 800, main: 'Clear' }],
    dt_txt: '2018-10-12 15:00:00'
  }
]

describe('Meteo service', () => {
  it('should select correct weather according to current day', () => {
    expect(getWeatherFor(data, () => true)).toBe(8)
  })
})
