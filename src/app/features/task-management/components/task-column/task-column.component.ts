import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCardComponent],
  template: `
    <div class="flex flex-col h-full min-w-[320px] max-w-[320px] bg-gray-50/50 rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div class="flex items-center gap-2">
           <h2 class="font-bold text-gray-700 text-sm tracking-wide uppercase">{{ title }}</h2>
           <span class="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
             {{ tasks.length }}
           </span>
        </div>
      </div>

      <!-- Drop List -->
      <div 
        cdkDropList
        [cdkDropListData]="tasks"
        [id]="id"
        class="flex-1 p-3 flex flex-col gap-3 overflow-y-auto min-h-[100px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
        (cdkDropListDropped)="onDrop.emit($event)">
        
        <app-task-card 
          *ngFor="let task of tasks" 
          [task]="task" 
          cdkDrag 
          [cdkDragData]="task"
          (onClick)="onTaskClick.emit($event)"
          (onMoveToTop)="onMoveToTop.emit(task)"
          (onMoveToBottom)="onMoveToBottom.emit(task)"
          class="block">
          
          <!-- Custom Drag Placeholder -->
          <div *cdkDragPlaceholder class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-[120px] w-full"></div>
          
        </app-task-card>

        <div *ngIf="tasks.length === 0" class="h-full flex items-center justify-center text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-lg m-2">
           Drop items here
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Clean scrollbar for the column */
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #e5e7eb;
      border-radius: 20px;
    }
    
    /* Dragging styles */
    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 0.5rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      opacity: 0.9;
      transform: rotate(2deg); 
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    /* Lists catching items */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class TaskColumnComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) tasks: Task[] = [];
  @Output() onDrop = new EventEmitter<any>();
  @Output() onTaskClick = new EventEmitter<Task>();
  @Output() onMoveToTop = new EventEmitter<Task>();
  @Output() onMoveToBottom = new EventEmitter<Task>();
}
