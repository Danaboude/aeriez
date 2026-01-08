import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th class="px-6 py-4">ID</th>
              <th class="px-6 py-4 w-1/3">Title</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Priority</th>
              <th class="px-6 py-4">Assignee</th>
              <th class="px-6 py-4 text-right">Created</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let task of tasks" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ task.id }}</td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{{ task.title }}</div>
                <div class="text-xs text-gray-400 mt-0.5 truncate max-w-[300px]">{{ task.description }}</div>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  [ngClass]="{
                    'bg-gray-100 text-gray-800 border-gray-200': task.status === 'TODO',
                    'bg-blue-50 text-blue-700 border-blue-200': task.status === 'IN_PROGRESS',
                    'bg-purple-50 text-purple-700 border-purple-200': task.status === 'CODE_REVIEW',
                    'bg-green-50 text-green-700 border-green-200': task.status === 'DONE'
                  }">
                  {{ task.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-1.5">
                   <div [ngSwitch]="task.priority">
                     <svg *ngSwitchCase="'HIGH'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                     <svg *ngSwitchCase="'MEDIUM'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><path d="M6 9l6 6 6-6"/></svg>
                     <svg *ngSwitchCase="'LOW'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                   </div>
                   <span class="text-sm text-gray-600">{{ task.priority }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                 <div class="flex items-center gap-2">
                   <img [src]="task.assignee.avatarUrl" class="w-6 h-6 rounded-full ring-1 ring-gray-200">
                   <span class="text-sm text-gray-700">{{ task.assignee.name }}</span>
                 </div>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="text-sm font-medium text-gray-500">{{ task.creationDate | date:'mediumDate' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div *ngIf="tasks.length === 0" class="p-8 text-center text-gray-400 text-sm">
           No tasks found.
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TaskListViewComponent {
  @Input({ required: true }) tasks: Task[] = [];
}
