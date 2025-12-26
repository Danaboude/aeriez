import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-team-member-card',
    standalone: true,
    imports: [CommonModule, CardComponent, RouterModule],
    template: `
    <app-card [padding]="false" [shadow]="true" className="h-full group cursor-pointer overflow-hidden" [hover]="true">
      <div class="relative overflow-hidden aspect-square">
        <img [src]="image" [alt]="name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
        <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span class="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">View Profile</span>
        </div>
      </div>
      <div class="p-6 text-center">
        <h3 class="text-xl font-bold text-navy-900 mb-1">{{ name }}</h3>
        <p class="text-primary-600 font-medium">{{ role }}</p>
      </div>
    </app-card>
  `
})
export class TeamMemberCardComponent {
    @Input() name = '';
    @Input() role = '';
    @Input() image = '';
    @Input() id = '';
}
