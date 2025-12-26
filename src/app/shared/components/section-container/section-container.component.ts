import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-section-container',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section 
      [className]="'w-full py-16 md:py-24 relative overflow-hidden ' + className"
      [id]="id">
      <div [className]="'container mx-auto px-4 md:px-6 z-10 relative ' + containerClass">
        <ng-content></ng-content>
      </div>
      <!-- Optional background elements -->
      <ng-content select="[background]"></ng-content>
    </section>
  `
})
export class SectionContainerComponent {
    @Input() id = '';
    @Input() className = '';
    @Input() containerClass = '';
}
