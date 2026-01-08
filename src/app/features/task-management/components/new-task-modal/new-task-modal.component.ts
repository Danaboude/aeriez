import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Task, TaskPriority, TaskStatus, User } from '../../models/task.model';
import { USERS } from '../../data/mock-data';

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

          <!-- Priority & Assignee Row -->
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
             
             <!-- Due Date -->
             <div>
               <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
               <input 
                 type="date" 
                 [(ngModel)]="dueDate" 
                 name="dueDate"
                 class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
             </div>
             
             <!-- Assignee -->
             <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select 
                  [(ngModel)]="selectedAssigneeId" 
                  name="assignee"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                  <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
                </select>
             </div>

          <!-- Tags -->
          <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div class="flex gap-2 mb-2 flex-wrap">
                  <span *ngFor="let tag of tags; let i = index" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      {{ tag }}
                      <button type="button" (click)="removeTag(i)" class="text-gray-400 hover:text-red-500">×</button>
                  </span>
              </div>
              <div class="flex gap-2">
                  <input 
                    type="text" 
                    [(ngModel)]="newTag" 
                    name="newTag" 
                    (keydown.enter)="$event.preventDefault(); addTag()"
                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                    placeholder="Type tag and press Enter">
                  <button type="button" (click)="addTag()" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium transition-colors">Add</button>
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

  users = USERS;
  selectedAssigneeId = USERS[0].id; // Default to first user

  tags: string[] = [];
  newTag = '';

  dueDate: string = '';

  addTag() {
    if (this.newTag.trim()) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  onSubmit() {
    if (this.title.trim()) {
      const assignee = this.users.find(u => u.id === this.selectedAssigneeId) || this.users[0];

      this.onSave.emit({
        title: this.title,
        description: this.description,
        priority: this.priority,
        status: 'TODO',
        comments: [],
        tags: this.tags,
        assignee: assignee,
        reporter: this.users.find(u => u.id === 'u1') || assignee, // Mock reporter
        dueDate: this.dueDate ? new Date(this.dueDate) : undefined
      });
    }
  }
}
