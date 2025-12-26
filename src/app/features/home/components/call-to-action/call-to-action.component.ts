import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ScrollRevealDirective],
  template: `
    <section class="py-24 relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="bg-primary-600 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <!-- Background Pattern -->
          <div class="absolute inset-0 z-0 opacity-20">
             <div class="absolute top-0 right-0 rounded-full w-[600px] h-[600px] bg-white blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div class="absolute bottom-0 left-0 rounded-full w-[400px] h-[400px] bg-accent-400 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div class="relative z-10 max-w-3xl mx-auto">
            <h2 appScrollReveal animation="fade-in-up" class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to streamline your <span class="text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-100">workflow</span>?
            </h2>
            <p appScrollReveal animation="fade-in-up" [delay]="200" class="text-primary-50 text-lg md:text-xl mb-10 leading-relaxed opacity-90">
              Join leading organizations that are using Aeriez to visualize information flow and reduce handover time. Start your free trial today.
            </p>
            <div appScrollReveal animation="fade-in-up" [delay]="400" class="flex flex-col sm:flex-row gap-4 justify-center">
              <app-button variant="white" size="lg" iconRight="fas fa-arrow-right" class="shadow-xl shadow-primary-900/20">
                Get Started Now
              </app-button>
              <app-button variant="outline-white" size="lg">
                Contact Sales
              </app-button>
            </div>
            
            <div appScrollReveal animation="fade-in" [delay]="600" class="mt-12 flex items-center justify-center gap-6 text-primary-200 text-sm font-medium">
               <div class="flex items-center gap-2">
                 <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                 <span>No credit card required</span>
               </div>
               <div class="flex items-center gap-2">
                 <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                 <span>14-day free trial</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CallToActionComponent { }
