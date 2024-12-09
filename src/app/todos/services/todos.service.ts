import { computed, Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);
  noTodoClass = computed(() => this.todosSig().length === 0);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      content: text,
      id: Math.random().toString(16),
      isCompleted: false,
    };
    this.todosSig.update((prevTodos) => [...prevTodos, newTodo]);
  }
  changeFilter(newFilter: FilterEnum): void {
    this.filterSig.set(newFilter);
  }
  changeTodo(todoId: string, content: string): void {
    this.todosSig.update((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todoId ? { ...item, content } : item
      )
    );
  }
  toggleTodo(todoId: string): void {
    this.todosSig.update((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todoId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }
  getTodoById(todoId: string): TodoInterface | undefined {
    return this.todosSig().find((item) => item.id === todoId);
  }
  removeTodo(todoId: string) {
    this.todosSig.update((prevTodos) =>
      prevTodos.filter((item) => item.id !== todoId)
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((prevTodos) =>
      prevTodos.map((item) => ({ ...item, isCompleted }))
    );
  }
}
