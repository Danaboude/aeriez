import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskComment } from '../../models/task.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
    selector: 'app-task-details-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonComponent],
    template: `
    <div *ngIf="task" class="fixed inset-0 z-[100] flex justify-end" role="dialog">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
           (click)="onClose.emit()"></div>

      <!-- Slide-over Panel -->
      <div class="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right">
        
        <!-- Header -->
        <div class="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
           <div class="flex flex-col gap-2">
             <div class="flex items-center gap-2 text-sm text-gray-500 font-mono">
               <span>{{ task.id }}</span>
               <span class="w-1 h-1 rounded-full bg-gray-300"></span>
               <span class="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider text-gray-600">
                {{ task.status.replace('_', ' ') }}
               </span>
             </div>
             <h2 class="text-xl font-bold text-gray-900 leading-tight">{{ task.title }}</h2>
           </div>
           <button (click)="onClose.emit()" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-8">
          
          <!-- Description -->
          <section>
             <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
             <p class="text-gray-600 leading-relaxed">{{ task.description }}</p>
          </section>

          <!-- Meta Data Grid -->
          <section class="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
             <div>
                <span class="block text-xs font-medium text-gray-500 uppercase mb-1">Assignee</span>
                <div class="flex items-center gap-2">
                   <img [src]="task.assignee.avatarUrl" class="w-6 h-6 rounded-full">
                   <span class="text-sm font-medium text-gray-800">{{ task.assignee.name }}</span>
                </div>
             </div>
             <div>
                <span class="block text-xs font-medium text-gray-500 uppercase mb-1">Priority</span>
                <div class="flex items-center gap-2">
                   <span [ngClass]="{
                     'text-red-600 bg-red-50': task.priority === 'HIGH',
                     'text-orange-600 bg-orange-50': task.priority === 'MEDIUM',
                     'text-green-600 bg-green-50': task.priority === 'LOW'
                   }" class="px-2 py-0.5 rounded text-xs font-bold">
                     {{ task.priority }}
                   </span>
                </div>
             </div>
             <div>
                 <span class="block text-xs font-medium text-gray-500 uppercase mb-1">Story Points</span>
                 <span class="text-sm font-medium text-gray-800">{{ task.storyPoints || '-' }}</span>
             </div>
               <div>
                 <span class="block text-xs font-medium text-gray-500 uppercase mb-1">Due Date</span>
                 <span class="text-sm font-medium text-gray-800">{{ task.dueDate ? (task.dueDate | date:'mediumDate') : '-' }}</span>
             </div>
          </section>

          <!-- Comments -->
          <section>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              Comments 
              <span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">{{ task.comments.length }}</span>
            </h3>
            
            <div class="space-y-4 mb-6">
              <div *ngFor="let comment of task.comments" class="flex gap-3">
                 <img [src]="comment.author.avatarUrl" class="w-8 h-8 rounded-full flex-shrink-0 mt-1">
                 <div class="flex-1 bg-gray-50 rounded-lg rounded-tl-none p-3">
                    <div class="flex items-center justify-between mb-1">
                       <span class="text-sm font-bold text-gray-900">{{ comment.author.name }}</span>
                       <span class="text-xs text-gray-400">{{ comment.createdAt | date:'shortTime' }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ comment.content }}</p>
                 </div>
              </div>
              <div *ngIf="task.comments.length === 0" class="text-center py-8 text-gray-400 text-sm italic">
                No comments yet. Start the conversation!
              </div>
            </div>

            <!-- Add Comment Input -->
            <div class="flex gap-3 items-start">
               <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">ME</div>
               <div class="flex-1">
                 <textarea 
                    [(ngModel)]="newCommentText"
                    placeholder="Write a comment..." 
                    class="w-full text-sm border border-gray-200 rounded-lg p-3 min-h-[80px] focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none block mb-2"></textarea>
                 <div class="flex justify-end">
                    <app-button size="sm" [disabled]="!newCommentText.trim()" (onClick)="addComment()">Post Comment</app-button>
                 </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in-right {
      animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `]
})
export class TaskDetailsModalComponent {
    @Input({ required: true }) task!: Task;
    @Output() onClose = new EventEmitter<void>();
    @Output() onCommentAdd = new EventEmitter<string>();

    newCommentText = '';

    addComment() {
        if (this.newCommentText.trim()) {
            this.onCommentAdd.emit(this.newCommentText);
            this.newCommentText = '';
        }
    }
}
