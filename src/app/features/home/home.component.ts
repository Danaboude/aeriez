import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, FeaturesComponent, BenefitsComponent, CustomersComponent, CallToActionComponent],
  template: `
    <div class="relative overflow-hidden bg-white">
      <!-- Global subtle background decoration -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div class="absolute top-[40%] left-0 w-[600px] h-[600px] bg-accent-50/30 rounded-full blur-3xl -translate-x-1/2 pointer-events-none z-0"></div>
    
      <main class="relative z-10">
        <app-hero></app-hero>
        <app-customers></app-customers>
        <app-features></app-features>
        <app-benefits></app-benefits>
        <app-call-to-action></app-call-to-action>
        <!-- Assuming the new CTA component should be added here, or replace the existing one -->
        <!-- If it's a new component, you might add it like this: -->
        <!-- <app-cta></app-cta> -->
      </main>
    </div>
  `
})
export class HomeComponent { }
