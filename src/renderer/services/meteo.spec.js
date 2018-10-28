import { getWeatherFor } from './meteo'

const data = [
  {
    weather: [{ id: 800, main: 'Clear' }],
    dt_txt: '2018-10-12 12:00:00'
  },
  {
    weather: [{ id: 800, main: 'Clear' }],
    dt_txt: '2018-10-12 15:00:00'
  },
  {
    weather: [{ id: 200, main: 'Thunder' }],
    dt_txt: '2018-10-12 18:00:00'
  }
]

describe('Meteo service', () => {
  it('should select worst weather according to current day', () => {
    expect(getWeatherFor(data, () => true)).toBe('2')
  })

  it('should select rain over thunder', () => {
    const customData = [...data]
    customData.push({
      weather: [{ id: 500, main: 'Rain' }],
      dt_txt: '2018-10-12 21:00:00'
    })

    expect(getWeatherFor(customData, () => true)).toBe('5')
  })
})
