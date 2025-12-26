import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';
import { TiltDirective } from '@core/directives/tilt.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ScrollRevealDirective, TiltDirective],
  template: `
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      
      <!-- Interactive Blobs (kept for subtle movement behind the image) -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-accent-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div class="container mx-auto px-4 md:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="flex flex-col gap-6 text-center lg:text-left">
          <h1 
            appScrollReveal animation="fade-in-up" [delay]="100"
            class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy-900 leading-tight">
            Balance the information <br class="hidden lg:block"/> flow in all <span class="text-primary-500 relative inline-block">
              departments
              <svg class="absolute w-full h-3 -bottom-1 left-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor"/>
              </svg>
            </span>.
          </h1>
          
          <p 
            appScrollReveal animation="fade-in-up" [delay]="300"
            class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Digital Andon at your fingertips. 1000 eyes AI product checks. 
            Connect. Check. Trigger. Consolidate.
          </p>
          
          <div 
            appScrollReveal animation="fade-in-up" [delay]="500"
            class="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <app-button variant="primary" size="lg" iconRight="fas fa-arrow-right">
              Start Free Trial
            </app-button>
            <app-button variant="outline" size="lg" iconLeft="fas fa-play">
              Request Demo
            </app-button>
          </div>
        </div>
        
        <!-- Hero Visual -->
        <div 
          appScrollReveal animation="slide-in-right" [delay]="400"
          class="relative lg:h-[600px] flex items-center justify-center">
          
          <!-- 3D Tilt Card -->
          <div appTilt [rotationMax]="15" class="relative w-full max-w-md mx-auto cursor-pointer">
            <div class="relative z-20 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden p-3 transition-shadow duration-300 hover:shadow-2xl">
              <img src="/top.png" alt="App Dashboard" class="rounded-2xl w-full h-auto shadow-inner">
              
              <!-- Floating Elements -->
              <div class="absolute top-8 -right-4 bg-white p-3 rounded-lg shadow-lg flex items-center gap-3 border border-gray-100 transform translate-z-10">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <i class="fas fa-check text-xs"></i>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status</p>
                  <p class="text-sm font-bold text-navy-900">Operational</p>
                </div>
              </div>

              <div class="absolute bottom-12 -left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-100 transform translate-z-10">
                <p class="text-xs font-bold text-navy-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                  Real-time Monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
  `]
})
export class HeroComponent { }
