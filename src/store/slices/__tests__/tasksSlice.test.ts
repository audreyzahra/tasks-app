import tasksReducer, {
  addTask,
  deleteTask,
  updateTask,
  setTasks,
  mergeTasks,
  updateTaskStatus,
} from '../tasksSlice'
import { TTaskSchema } from '@/schema/tasks.model'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('tasksSlice', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  const mockTask: TTaskSchema = {
    userId: 1,
    id: 1,
    title: 'Test Task',
    body: 'Test Description',
    status: 'pending',
  }

  const mockTask2: TTaskSchema = {
    userId: 1,
    id: 2,
    title: 'Test Task 2',
    body: 'Test Description 2',
    status: 'completed',
  }

  describe('initialState', () => {
    it('should have empty tasks array initially', () => {
      const state = tasksReducer(undefined, { type: 'unknown' })
      expect(state.tasks).toEqual([])
    })
  })

  describe('addTask', () => {
    it('should add a new task with auto-generated id', () => {
      const initialState = { tasks: [] }
      const action = addTask({
        userId: 1,
        title: 'New Task',
        body: 'New Description',
        status: 'pending',
      })

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(1)
      expect(newState.tasks[0]).toMatchObject({
        userId: 1,
        title: 'New Task',
        body: 'New Description',
        status: 'pending',
      })
      expect(newState.tasks[0].id).toBe(1)
    })

    it('should generate id based on max existing id', () => {
      const initialState = { tasks: [mockTask] }
      const action = addTask({
        userId: 1,
        title: 'New Task',
        body: 'New Description',
        status: 'pending',
      })

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(2)
      expect(newState.tasks[1].id).toBe(2)
    })
  })

  describe('deleteTask', () => {
    it('should delete task by id', () => {
      const initialState = { tasks: [mockTask, mockTask2] }
      const action = deleteTask(1)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(1)
      expect(newState.tasks[0].id).toBe(2)
    })

    it('should not delete anything if id does not exist', () => {
      const initialState = { tasks: [mockTask] }
      const action = deleteTask(999)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(1)
    })
  })

  describe('updateTask', () => {
    it('should update existing task', () => {
      const initialState = { tasks: [mockTask] }
      const updatedTask: TTaskSchema = {
        ...mockTask,
        title: 'Updated Title',
        body: 'Updated Description',
      }
      const action = updateTask(updatedTask)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks[0].title).toBe('Updated Title')
      expect(newState.tasks[0].body).toBe('Updated Description')
    })

    it('should not update if task does not exist', () => {
      const initialState = { tasks: [mockTask] }
      const nonExistentTask: TTaskSchema = {
        ...mockTask,
        id: 999,
        title: 'Updated Title',
      }
      const action = updateTask(nonExistentTask)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toEqual(initialState.tasks)
    })
  })

  describe('setTasks', () => {
    it('should replace all tasks', () => {
      const initialState = { tasks: [mockTask] }
      const newTasks = [mockTask2]
      const action = setTasks(newTasks)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toEqual(newTasks)
      expect(newState.tasks).toHaveLength(1)
    })
  })

  describe('mergeTasks', () => {
    it('should merge new tasks without duplicates', () => {
      const initialState = { tasks: [mockTask] }
      const newTasks = [mockTask2]
      const action = mergeTasks(newTasks)

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(2)
      expect(newState.tasks[0]).toEqual(mockTask)
      expect(newState.tasks[1]).toEqual(mockTask2)
    })

    it('should not add duplicate tasks', () => {
      const initialState = { tasks: [mockTask] }
      const duplicateTask = { ...mockTask }
      const action = mergeTasks([duplicateTask])

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks).toHaveLength(1)
    })

    it('should add default status to new tasks', () => {
      const initialState = { tasks: [] }
      const taskWithoutStatus = {
        userId: 1,
        id: 1,
        title: 'New Task',
        body: 'New Description',
      }
      const action = mergeTasks([taskWithoutStatus as any])

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks[0].status).toBe('pending')
    })
  })

  describe('updateTaskStatus', () => {
    it('should update task status', () => {
      const initialState = { tasks: [mockTask] }
      const action = updateTaskStatus({ id: 1, status: 'completed' })

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks[0].status).toBe('completed')
    })

    it('should not update if task does not exist', () => {
      const initialState = { tasks: [mockTask] }
      const action = updateTaskStatus({ id: 999, status: 'completed' })

      const newState = tasksReducer(initialState, action)

      expect(newState.tasks[0].status).toBe('pending')
    })
  })
})
