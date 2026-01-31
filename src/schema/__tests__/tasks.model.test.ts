import { TaskSchema, TasksSchemaResponse, TaskStatus } from '../tasks.model'

describe('Task Schema Validation', () => {
  describe('TaskStatus', () => {
    it('should accept "pending" status', () => {
      const result = TaskStatus.safeParse('pending')
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('pending')
      }
    })

    it('should accept "completed" status', () => {
      const result = TaskStatus.safeParse('completed')
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('completed')
      }
    })

    it('should reject invalid status', () => {
      const result = TaskStatus.safeParse('invalid')
      expect(result.success).toBe(false)
    })
  })

  describe('TaskSchema', () => {
    it('should validate a valid task', () => {
      const validTask = {
        userId: 1,
        id: 1,
        title: 'Test Task',
        body: 'Test Description',
        status: 'pending' as const,
      }

      const result = TaskSchema.safeParse(validTask)
      expect(result.success).toBe(true)
    })

    it('should default status to "pending" if not provided', () => {
      const taskWithoutStatus = {
        userId: 1,
        id: 1,
        title: 'Test Task',
        body: 'Test Description',
      }

      const result = TaskSchema.safeParse(taskWithoutStatus)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.status).toBe('pending')
      }
    })

    it('should reject task with missing required fields', () => {
      const invalidTask = {
        userId: 1,
        id: 1,
        // missing title and body
      }

      const result = TaskSchema.safeParse(invalidTask)
      expect(result.success).toBe(false)
    })

    it('should reject task with invalid types', () => {
      const invalidTask = {
        userId: '1', // should be number
        id: 1,
        title: 'Test Task',
        body: 'Test Description',
      }

      const result = TaskSchema.safeParse(invalidTask)
      expect(result.success).toBe(false)
    })
  })

  describe('TasksSchemaResponse', () => {
    it('should validate an array of valid tasks', () => {
      const validTasks = [
        {
          userId: 1,
          id: 1,
          title: 'Task 1',
          body: 'Description 1',
          status: 'pending' as const,
        },
        {
          userId: 1,
          id: 2,
          title: 'Task 2',
          body: 'Description 2',
          status: 'completed' as const,
        },
      ]

      const result = TasksSchemaResponse.safeParse(validTasks)
      expect(result.success).toBe(true)
    })

    it('should reject array with invalid task', () => {
      const invalidTasks = [
        {
          userId: 1,
          id: 1,
          title: 'Task 1',
          body: 'Description 1',
        },
        {
          userId: 1,
          // missing required fields
        },
      ]

      const result = TasksSchemaResponse.safeParse(invalidTasks)
      expect(result.success).toBe(false)
    })

    it('should validate empty array', () => {
      const result = TasksSchemaResponse.safeParse([])
      expect(result.success).toBe(true)
    })
  })
})
