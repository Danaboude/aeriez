import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col relative overflow-hidden group cursor-pointer"
      [ngClass]="{
        'bg-amber-400 text-amber-950': type === 'SC',
        'bg-yellow-300 text-yellow-900': type === 'QI',
        'bg-teal-400 text-teal-950': type === 'AU KAR',
        'bg-orange-400 text-orange-950': type === 'SAFE'
      }">
      
      <!-- Glass effect overlay -->
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Header Row -->
      <div class="flex justify-between items-start w-full z-10">
        <h3 class="text-lg font-black tracking-wider leading-none">{{ type }}</h3>
        <span class="text-[10px] font-bold font-mono opacity-80 bg-black/5 px-2 py-0.5 rounded-md backdrop-blur-sm">{{ timestamp }}</span>
      </div>
      
      <!-- Center Content -->
      <div class="flex-1 flex items-center justify-center w-full z-10">
        <div class="flex items-center gap-1.5 font-mono text-xl font-bold bg-white/20 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <span [class.opacity-40]="status !== 0">○</span>
          <span>{{ count1 }}</span>
          <span [class.opacity-40]="status !== 1" class="text-xs self-center">●</span>
          <span>{{ count2 }}</span>
          <span [class.opacity-40]="status !== 2">○</span>
          <span>{{ count3 }}</span>
        </div>
      </div>
    </div>
  `
})
export class StatusCardComponent {
  @Input() type: 'SC' | 'QI' | 'AU KAR' | 'SAFE' = 'SC';
  @Input() status: number = 0;
  @Input() count1: number = 0;
  @Input() count2: number = 0;
  @Input() count3: number = 0;
  @Input() timestamp: string = '';
}
