import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group animate-fade-in"
      (click)="onClick.emit(task)">
      
      <!-- Title -->
      <h3 class="text-sm font-medium text-gray-800 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
        {{ task.title }}
      </h3>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span *ngFor="let tag of task.tags" 
              class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded text-white"
              [ngClass]="getTagColor(tag)">
          {{ tag }}
        </span>
      </div>

      <!-- Footer: Meta & Assignee -->
      <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <div class="flex items-center gap-3 text-gray-400">
          
          <!-- Priority Icon -->
          <div [ngSwitch]="task.priority" title="Priority: {{task.priority}}">
             <svg *ngSwitchCase="'HIGH'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
             <svg *ngSwitchCase="'MEDIUM'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><path d="M6 9l6 6 6-6"/></svg>
             <svg *ngSwitchCase="'LOW'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>

          <!-- Story Points -->
          <div *ngIf="task.storyPoints" class="flex items-center gap-1 text-xs font-medium bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
            {{ task.storyPoints }}
          </div>
        </div>

        <div class="flex items-center gap-2">
            <!-- ID -->
            <span class="text-xs text-gray-400 font-mono">{{ task.id }}</span>
            
            <!-- Assignee -->
            <img [src]="task.assignee.avatarUrl" 
                 [alt]="task.assignee.name" 
                 [title]="task.assignee.name"
                 class="w-6 h-6 rounded-full ring-2 ring-white object-cover">
        </div>
      </div>

      <!-- Hover Actions (Absolute positioned) -->
      <div class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
           (click)="$event.stopPropagation(); onMoveToTop.emit(task)"
           class="p-1 bg-white rounded shadow-sm hover:shadow text-gray-400 hover:text-green-600 border border-gray-100 transition-all hover:scale-110"
           title="Move to Top">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
        </button>
        <button 
           (click)="$event.stopPropagation(); onMoveToBottom.emit(task)"
           class="p-1 bg-white rounded shadow-sm hover:shadow text-gray-400 hover:text-red-500 border border-gray-100 transition-all hover:scale-110"
           title="Move to Bottom">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
  `]
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() onClick = new EventEmitter<Task>();
  @Output() onMoveToTop = new EventEmitter<Task>();
  @Output() onMoveToBottom = new EventEmitter<Task>();

  getTagColor(tag: string): string {
    const colors: { [key: string]: string } = {
      'SPACE TRAVEL PARTNERS': 'bg-yellow-400 text-yellow-900',
      'LOCAL MARS OFFICE': 'bg-orange-500',
      'SEESPACEEZ PLUS': 'bg-cyan-400 text-cyan-900',
      'LARGE TEAM SUPPORT': 'bg-purple-600',
      'PERFORMANCE': 'bg-pink-500',
    };
    return colors[tag] || 'bg-gray-400';
  }
}
