import { getStatusColor, getStatusLabel } from '../helper'

describe('Helper Functions', () => {
  describe('getStatusColor', () => {
    it('should return green colors for completed status', () => {
      const result = getStatusColor('completed')
      expect(result).toBe('bg-green-50 border-green-200 text-green-700')
    })

    it('should return yellow colors for pending status', () => {
      const result = getStatusColor('pending')
      expect(result).toBe('bg-yellow-50 border-yellow-200 text-yellow-700')
    })

    it('should return yellow colors for any other status', () => {
      const result = getStatusColor('unknown')
      expect(result).toBe('bg-yellow-50 border-yellow-200 text-yellow-700')
    })
  })

  describe('getStatusLabel', () => {
    it('should return "Completed" for completed status', () => {
      const result = getStatusLabel('completed')
      expect(result).toBe('Completed')
    })

    it('should return "Pending" for pending status', () => {
      const result = getStatusLabel('pending')
      expect(result).toBe('Pending')
    })

    it('should return "Pending" for any other status', () => {
      const result = getStatusLabel('unknown')
      expect(result).toBe('Pending')
    })
  })
})
