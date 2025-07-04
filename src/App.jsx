import './App.css'
import { TodoDataProvider } from './todo'
import { Todo } from './todo/todo'

export function App() {

  return (
    <TodoDataProvider>
      <Todo />
    </TodoDataProvider>
  )
}

