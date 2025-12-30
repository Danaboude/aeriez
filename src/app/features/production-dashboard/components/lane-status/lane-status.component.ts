import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lane-status',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full w-full rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg group relative overflow-hidden"
      [ngClass]="{
        'bg-emerald-500 text-white': status === 'OK',
        'bg-rose-500 text-white': status === 'NOK'
      }">
      
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></div>

      <div class="flex flex-col items-center z-10">
        <span class="text-3xl font-black tracking-widest mb-2 transform group-hover:scale-110 transition-transform duration-300">{{ status }}</span>
        <span class="text-xs text-white/80 font-medium tracking-wide uppercase">Line Status</span>
      </div>
    </div>
  `
})
export class LaneStatusComponent {
    @Input() status: 'OK' | 'NOK' = 'OK';
}
