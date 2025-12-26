import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from '@shared/components/section-container/section-container.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TiltDirective } from '@core/directives/tilt.directive';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent, ScrollRevealDirective, ButtonComponent, TiltDirective],
  template: `
    <app-section-container id="benefits" className="bg-white">
      
      <!-- Benefit 1: ReportAnywhere -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div appScrollReveal animation="slide-in-left" class="order-2 lg:order-1 relative flex justify-center">
          <!-- Mobile Image -->
          <div appTilt [rotationMax]="10" class="relative w-full max-w-md lg:max-w-full">
            <div class="absolute inset-0 bg-primary-200/40 rounded-full blur-3xl transform translate-y-10 scale-90 -z-10"></div>
            <img src="/mobile.png" alt="ReportAnywhere Mobile App" class="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500">
          </div>
        </div>
        
        <div appScrollReveal animation="slide-in-right" [delay]="200" class="order-1 lg:order-2">
          <div class="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-6 border border-primary-100">Mobile First</div>
          <h2 class="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">ReportAnywhere</h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Report from anywhere using our mobile application. Directly notify the right stakeholders and turn issues into actions to decrease downtime.
          </p>
          <ul class="space-y-5 mb-10">
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Prevent small issues from being overlooked</span>
            </li>
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Perform audits and suggest improvements</span>
            </li>
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Unveil financial impact of decisions</span>
            </li>
          </ul>
          <app-button variant="outline" iconRight="fas fa-arrow-right">Learn More</app-button>
        </div>
      </div>

      <!-- Benefit 2: ConnectAnywhere -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div appScrollReveal animation="slide-in-left" class="order-1">
          <div class="inline-block px-3 py-1 bg-accent-50 text-accent-600 rounded-full text-sm font-semibold mb-6 border border-accent-100">Web Dashboard</div>
          <h2 class="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">ConnectAnywhere</h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Sit in the driver seat of your organization using our web application. Evaluate the flow of information and create a reaction method.
          </p>
          <ul class="space-y-5 mb-10">
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Make sure no issues stay unsolved</span>
            </li>
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Create a heartbeat in your company</span>
            </li>
            <li class="flex items-start">
              <div class="bg-green-100 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Speed up allocation of reports and tasks</span>
            </li>
          </ul>
          <app-button variant="outline" iconRight="fas fa-arrow-right">Learn More</app-button>
        </div>
        
        <div appScrollReveal animation="slide-in-right" [delay]="200" class="order-2 relative flex justify-center">
          <!-- Laptop Image -->
          <div appTilt [rotationMax]="5" class="relative w-full max-w-xl">
             <div class="absolute inset-0 bg-accent-200/40 rounded-full blur-3xl transform translate-y-10 scale-90 -z-10"></div>
            <img src="/laptop.png" alt="ConnectAnywhere Web Dashboard" class="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500">
          </div>
        </div>
      </div>

    </app-section-container>
  `
})
export class BenefitsComponent { }
