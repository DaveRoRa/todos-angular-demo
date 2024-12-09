import { Component, computed, inject, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { NgClass, NgFor } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [NgFor, TodoComponent, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  todosService = inject(TodosService);
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();
    switch (filter) {
      case FilterEnum.active:
        return todos.filter((item) => !item.isCompleted);
      case FilterEnum.completed:
        return todos.filter((item) => item.isCompleted);
      default:
        return todos;
    }
  });

  noTodoClass = this.todosService.noTodoClass;
  editingId = signal<string | null>(null);
  setEditingId(todoId: string | null) {
    this.editingId.set(todoId);
  }
  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((item) => item.isCompleted)
  );
  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
