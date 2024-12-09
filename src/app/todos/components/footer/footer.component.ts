import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterEnum = FilterEnum;
  noTodoClass = this.todosService.noTodoClass;
  activeCount = computed(
    () =>
      this.todosService.todosSig().filter((item) => !item.isCompleted).length
  );
  pluralItems = computed(() => (this.activeCount() !== 1 ? 's' : ''));
  changeFilter(event: Event, newFilter: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(newFilter);
  }
}
