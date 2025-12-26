import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="bg-gray-50 pt-10 pb-16">
      <div class="container mx-auto px-4">
        <p appScrollReveal animation="fade-in" class="text-center text-gray-500 font-medium mb-10 text-lg uppercase tracking-wider">
          Our customers that use everyday
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-5xl mx-auto opacity-80">
          <div appScrollReveal animation="fade-in" [delay]="100" class="w-full flex justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="/petersime incuvators & hatcheries.png" alt="Petersime" class="max-h-16 w-auto object-contain">
          </div>
          <div appScrollReveal animation="fade-in" [delay]="200" class="w-full flex justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="/werken vlaanderen.png" alt="Werken Vlaanderen" class="max-h-20 w-auto object-contain">
          </div>
          <div appScrollReveal animation="fade-in" [delay]="300" class="w-full flex justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="/3.png" alt="CNH Industrial" class="max-h-24 w-auto object-contain">
          </div>
        </div>
      </div>
    </section>
  `
})
export class CustomersComponent { }
