import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { SectionContainerComponent } from '@shared/components/section-container/section-container.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [CommonModule, CardComponent, SectionContainerComponent, ScrollRevealDirective],
    template: `
    <app-section-container id="features" className="bg-white">
      <div 
        appScrollReveal animation="fade-in-up"
        class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-primary-600 font-bold tracking-wide uppercase text-sm mb-3">Our Features</h2>
        <p class="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
          Everything you need to optimize your workforce
        </p>
        <p class="text-gray-600 text-lg">
          Our software is an essential asset for helping organizations get the most out of their workforce by showing realtime information flow.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Feature 1 -->
        <div appScrollReveal animation="fade-in-up" [delay]="100" class="h-full">
          <app-card [padding]="true" [shadow]="true" className="h-full border-t-4 border-t-primary-500">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 text-primary-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-navy-900">Take Initiative</h3>
            <p class="text-gray-600">
              Facilitate ownership and participation by connecting and triggering your employees to take action when needed.
            </p>
          </app-card>
        </div>

        <!-- Feature 2 -->
        <div appScrollReveal animation="fade-in-up" [delay]="200" class="h-full">
          <app-card [padding]="true" [shadow]="true" className="h-full border-t-4 border-t-primary-500">
            <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-6 text-accent-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-navy-900">Organizational Speed</h3>
            <p class="text-gray-600">
              Directly notify stakeholders. Connect people driven by the heartbeat of your company with our technical solution.
            </p>
          </app-card>
        </div>

        <!-- Feature 3 -->
        <div appScrollReveal animation="fade-in-up" [delay]="300" class="h-full">
          <app-card [padding]="true" [shadow]="true" className="h-full border-t-4 border-t-primary-500">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-navy-900">AI Quality Checks</h3>
            <p class="text-gray-600">
              Each operator can use AI product checks using only a smartphone. If something is wrong, departments are notified instantly.
            </p>
          </app-card>
        </div>

        <!-- Feature 4 -->
        <div appScrollReveal animation="fade-in-up" [delay]="400" class="h-full">
          <app-card [padding]="true" [shadow]="true" className="h-full border-t-4 border-t-primary-500">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-navy-900">Boost Improvement</h3>
            <p class="text-gray-600">
              Capture consistent data and connect your BI system. Go from gut-feeling to semi-scientific analysis.
            </p>
          </app-card>
        </div>
      </div>
    </app-section-container>
  `
})
export class FeaturesComponent { }
