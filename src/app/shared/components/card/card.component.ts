import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div 
      class="bg-white rounded-2xl transition-all duration-300 group h-full flex flex-col overflow-hidden"
      [ngClass]="[
        hover ? 'hover:shadow-large hover:-translate-y-1' : '',
        padding ? 'p-6 md:p-8' : '',
        shadow ? 'shadow-soft' : 'border border-gray-200',
        className
      ]">
      
      <!-- Optional Header Image -->
      <div *ngIf="imageSrc" class="relative overflow-hidden aspect-video w-full" [class.rounded-t-2xl]="!padding">
        <img [src]="imageSrc" [alt]="imageAlt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
        <div *ngIf="imageOverlay" class="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/0 transition-colors duration-300"></div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 flex flex-col">
        <h3 *ngIf="title" class="text-xl font-bold mb-3 text-navy-900 group-hover:text-primary-600 transition-colors">
          {{ title }}
        </h3>
        
        <div class="text-gray-600 flex-1">
          <ng-content></ng-content>
        </div>
        
        <!-- Footer/Action Area -->
        <div *ngIf="hasFooter" class="mt-6 pt-6 border-t border-gray-100">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class CardComponent {
    @Input() title = '';
    @Input() imageSrc = '';
    @Input() imageAlt = '';
    @Input() className = '';
    @Input() hover = true;
    @Input() shadow = true;
    @Input() padding = true;
    @Input() imageOverlay = false;

    // Helper to check if footer content is projected (simplified)
    @Input() hasFooter = false;
}
