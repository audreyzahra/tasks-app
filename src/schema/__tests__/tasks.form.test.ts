import { AddTaskFormSchema } from '../tasks.form'

describe('AddTaskFormSchema', () => {
  it('should validate a valid form', () => {
    const validForm = {
      title: 'Test Task',
      body: 'Test Description',
    }

    const result = AddTaskFormSchema.safeParse(validForm)
    expect(result.success).toBe(true)
  })

  it('should reject empty title', () => {
    const invalidForm = {
      title: '',
      body: 'Test Description',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is required')
    }
  })

  it('should reject empty body', () => {
    const invalidForm = {
      title: 'Test Task',
      body: '',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Description is required')
    }
  })

  it('should reject missing title', () => {
    const invalidForm = {
      body: 'Test Description',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
  })

  it('should reject missing body', () => {
    const invalidForm = {
      title: 'Test Task',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
  })

  it('should trim whitespace from title and body', () => {
    const formWithWhitespace = {
      title: '  Test Task  ',
      body: '  Test Description  ',
    }

    const result = AddTaskFormSchema.safeParse(formWithWhitespace)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.title).toBe('Test Task')
      expect(result.data.body).toBe('Test Description')
    }
  })

  it('should reject title with only whitespace', () => {
    const invalidForm = {
      title: '   ',
      body: 'Test Description',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
  })

  it('should reject body with only whitespace', () => {
    const invalidForm = {
      title: 'Test Task',
      body: '   ',
    }

    const result = AddTaskFormSchema.safeParse(invalidForm)
    expect(result.success).toBe(false)
  })
})
