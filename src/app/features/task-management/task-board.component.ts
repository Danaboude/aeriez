import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from './models/task.model';
import { MOCK_TASKS } from './data/mock-data';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { TaskDetailsModalComponent } from './components/task-details-modal/task-details-modal.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { TaskListViewComponent } from './components/task-list-view/task-list-view.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, TaskColumnComponent, TaskDetailsModalComponent, NewTaskModalComponent, TaskListViewComponent],
  template: `
    <div class="h-[calc(100vh-80px)] mt-20 p-6 flex flex-col gap-6 overflow-hidden max-w-[1400px] mx-auto w-full">
      <!-- Header -->
      <div class="flex items-center justify-between flex-shrink-0">
        <div>
           <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Production Schedule</h1>
           <p class="text-sm text-gray-500">Track vehicle assembly, maintenance, and logistics.</p>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-3">
           <div class="bg-gray-100 rounded-lg p-1 flex items-center">
             <button 
                (click)="viewMode.set('board')"
                [class.bg-white]="viewMode() === 'board'"
                [class.shadow-sm]="viewMode() === 'board'"
                class="px-3 py-1.5 rounded-md text-sm font-medium text-gray-800 transition-all">Board</button>
             <button 
                (click)="viewMode.set('list')"
                [class.bg-white]="viewMode() === 'list'"
                [class.shadow-sm]="viewMode() === 'list'"
                class="px-3 py-1.5 rounded-md text-sm font-medium text-gray-800 transition-all">List</button>
           </div>
           <button 
             (click)="isNewTaskModalOpen.set(true)"
             class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-primary-500/30 transition-all flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             New Issue
           </button>
        </div>
      </div>

      <!-- Board View -->
      <div *ngIf="viewMode() === 'board'" class="flex-1 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden pb-4">
        <div 
          cdkDropListGroup 
          class="flex flex-col md:flex-row h-full gap-6 w-full md:min-w-max items-start">
          
          <app-task-column
            *ngFor="let col of columns"
            [id]="col.id"
            [title]="col.title"
            [tasks]="col.tasks()"
            (onDrop)="drop($event)"
            (onTaskClick)="selectTask($event)"
            (onMoveToTop)="moveToTop($event, col.id)"
            (onMoveToBottom)="moveToBottom($event, col.id)">
          </app-task-column>

        </div>
      </div>

      <!-- List View -->
      <div *ngIf="viewMode() === 'list'" class="flex-1 overflow-y-auto">
         <app-task-list-view [tasks]="allTasks()"></app-task-list-view>
      </div>

      <!-- Modals -->
      <app-task-details-modal 
        *ngIf="selectedTask()" 
        [task]="selectedTask()!"
        (onClose)="selectedTask.set(null)"
        (onCommentAdd)="addComment($event)">
      </app-task-details-modal>

      <app-new-task-modal
        *ngIf="isNewTaskModalOpen()"
        (onClose)="isNewTaskModalOpen.set(false)"
        (onSave)="createNewTask($event)">
      </app-new-task-modal>
    </div>
  `,
  styles: []
})
export class TaskBoardComponent {
  viewMode = signal<'board' | 'list'>('board');

  // Master list of tasks
  tasks = signal<Task[]>(MOCK_TASKS);

  selectedTask = signal<Task | null>(null);
  isNewTaskModalOpen = signal(false);

  todoTasks = signal<Task[]>(MOCK_TASKS.filter(t => t.status === 'TODO'));
  inProgressTasks = signal<Task[]>(MOCK_TASKS.filter(t => t.status === 'IN_PROGRESS'));
  codeReviewTasks = signal<Task[]>(MOCK_TASKS.filter(t => t.status === 'CODE_REVIEW'));
  doneTasks = signal<Task[]>(MOCK_TASKS.filter(t => t.status === 'DONE'));

  columns = [
    { id: 'TODO', title: 'To Do', tasks: this.todoTasks },
    { id: 'IN_PROGRESS', title: 'In Progress', tasks: this.inProgressTasks },
    { id: 'CODE_REVIEW', title: 'Quality Check', tasks: this.codeReviewTasks },
    { id: 'DONE', title: 'Done', tasks: this.doneTasks },
  ];

  // Helper to aggregate all tasks for List View (reactive)
  allTasks = computed(() => {
    return [
      ...this.todoTasks(),
      ...this.inProgressTasks(),
      ...this.codeReviewTasks(),
      ...this.doneTasks()
    ];
  });

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      const currentArray = [...event.container.data];
      moveItemInArray(currentArray, event.previousIndex, event.currentIndex);
      this.updateColumnSignal(event.container.id, currentArray);
    } else {
      const previousArray = [...event.previousContainer.data];
      const currentArray = [...event.container.data];
      const task = previousArray[event.previousIndex];

      transferArrayItem(
        previousArray,
        currentArray,
        event.previousIndex,
        event.currentIndex,
      );

      const newStatus = event.container.id as TaskStatus;
      task.status = newStatus;

      this.updateColumnSignal(event.previousContainer.id, previousArray);
      this.updateColumnSignal(event.container.id, currentArray);
    }
  }

  updateColumnSignal(columnId: string, newTasks: Task[]) {
    switch (columnId) {
      case 'TODO': this.todoTasks.set(newTasks); break;
      case 'IN_PROGRESS': this.inProgressTasks.set(newTasks); break;
      case 'CODE_REVIEW': this.codeReviewTasks.set(newTasks); break;
      case 'DONE': this.doneTasks.set(newTasks); break;
    }
  }

  selectTask(task: Task) {
    this.selectedTask.set(task);
  }

  addComment(content: string) {
    const task = this.selectedTask();
    if (task) {
      task.comments.unshift({
        id: Math.random().toString(36).substr(2, 9),
        author: {
          id: 'me',
          name: 'Me',
          avatarUrl: 'https://ui-avatars.com/api/?name=Me&background=random'
        },
        content: content,
        createdAt: new Date()
      });
    }
  }

  createNewTask(newTaskData: Partial<Task>) {
    const newTask: Task = {
      id: `PRD-${Math.floor(Math.random() * 1000)}`,
      title: newTaskData.title!,
      description: newTaskData.description || '',
      status: 'TODO',
      priority: newTaskData.priority!,
      tags: newTaskData.tags || [],
      assignee: newTaskData.assignee!,
      reporter: newTaskData.reporter!,
      creationDate: new Date(),
      dueDate: newTaskData.dueDate,
      comments: []
    };

    // Add to TODO list
    this.todoTasks.update(tasks => [newTask, ...tasks]);
    this.isNewTaskModalOpen.set(false);
  }

  moveToTop(task: Task, colId: string) {
    const signalToUpdate = this.getSignalByColId(colId);
    if (signalToUpdate) {
      const currentTasks = signalToUpdate();
      const index = currentTasks.indexOf(task);
      if (index > 0) {
        const newTasks = [...currentTasks];
        newTasks.splice(index, 1);
        newTasks.unshift(task);
        signalToUpdate.set(newTasks);
      }
    }
  }

  moveToBottom(task: Task, colId: string) {
    const signalToUpdate = this.getSignalByColId(colId);
    if (signalToUpdate) {
      const currentTasks = signalToUpdate();
      const index = currentTasks.indexOf(task);
      if (index > -1 && index < currentTasks.length - 1) {
        const newTasks = [...currentTasks];
        newTasks.splice(index, 1);
        newTasks.push(task);
        signalToUpdate.set(newTasks);
      }
    }
  }

  getSignalByColId(colId: string) {
    switch (colId) {
      case 'TODO': return this.todoTasks;
      case 'IN_PROGRESS': return this.inProgressTasks;
      case 'CODE_REVIEW': return this.codeReviewTasks;
      case 'DONE': return this.doneTasks;
      default: return null;
    }
  }
}
