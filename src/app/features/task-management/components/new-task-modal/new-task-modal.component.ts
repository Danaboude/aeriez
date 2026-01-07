import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
    selector: 'app-new-task-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonComponent],
    template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" (click)="onClose.emit()"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 transform transition-all scale-100 animate-fade-in-up">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Create New Issue</h2>
          <button (click)="onClose.emit()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input 
              type="text" 
              [(ngModel)]="title" 
              name="title" 
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="What needs to be done?">
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              [(ngModel)]="description" 
              name="description" 
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
              placeholder="Add more details..."></textarea>
          </div>

          <!-- Priority & Tag Row -->
          <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  [(ngModel)]="priority" 
                  name="priority"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
             </div>
             
             <!-- Assignee (Hardcoded for now as 'Me' is default) -->
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <div class="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed">
                   <img src="https://ui-avatars.com/api/?name=Me&background=random" class="w-5 h-5 rounded-full">
                   <span class="text-sm">Me</span>
                </div>
             </div>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              (click)="onClose.emit()"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <app-button 
              type="submit" 
              [disabled]="!title.trim()"
              variant="primary">
              Create Issue
            </app-button>
          </div>

        </form>
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `]
})
export class NewTaskModalComponent {
    @Output() onClose = new EventEmitter<void>();
    @Output() onSave = new EventEmitter<Partial<Task>>();

    title = '';
    description = '';
    priority: TaskPriority = 'MEDIUM';

    onSubmit() {
        if (this.title.trim()) {
            this.onSave.emit({
                title: this.title,
                description: this.description,
                priority: this.priority,
                status: 'TODO',
                // Default values for new task
                comments: [],
                tags: [],
                assignee: { id: 'me', name: 'Me', avatarUrl: 'https://ui-avatars.com/api/?name=Me&background=random' },
                reporter: { id: 'me', name: 'Me', avatarUrl: 'https://ui-avatars.com/api/?name=Me&background=random' }
            });
        }
    }
}
