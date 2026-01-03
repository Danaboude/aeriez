import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionContainerComponent } from '@shared/components/section-container/section-container.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';
import { TeamMemberCardComponent } from './components/team-member-card/team-member-card.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionContainerComponent, ScrollRevealDirective, TeamMemberCardComponent],
  template: `
    <div class="pt-20">
      <!-- Header -->
      <section class="bg-gray-50 py-20 text-center">
        <div class="container mx-auto px-4">
          <h1 appScrollReveal animation="fade-in-up" class="text-4xl md:text-5xl font-bold text-navy-900 mb-6">The heartbeat of aeriez</h1>
          <p appScrollReveal animation="fade-in-up" [delay]="100" class="text-xl text-gray-600 max-w-2xl mx-auto">
            Our organization is built by our team and their decisions according to the principles of sociocracy 3.0.
          </p>
        </div>
      </section>

      <!-- Members Grid -->
      <app-section-container className="bg-white">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div *ngFor="let member of members; let i = index" 
               appScrollReveal animation="fade-in-up" [delay]="100 + (i * 100)">
            <a [routerLink]="['/team', member.id]">
              <app-team-member-card
                [name]="member.name"
                [role]="member.role"
                [image]="member.image">
              </app-team-member-card>
            </a>
          </div>
        </div>
      </app-section-container>

      <!-- Values Section -->
      <section class="py-24 relative overflow-hidden bg-navy-900 text-white">
        <!-- Background Decor -->
        <div class="absolute inset-0 z-0">
           <div class="absolute top-0 right-0 rounded-full w-[800px] h-[800px] bg-primary-600/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div class="absolute bottom-0 left-0 rounded-full w-[600px] h-[600px] bg-accent-600/10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div class="container mx-auto px-4 md:px-6 relative z-10">
          <div class="text-center mb-16 max-w-3xl mx-auto">
            <h2 appScrollReveal animation="fade-in-up" class="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Our Values</h2>
            <p appScrollReveal animation="fade-in-up" [delay]="100" class="text-gray-300 text-lg md:text-xl leading-relaxed">
              These values actively influence our behaviour and how we interact with each other, partners and customers.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let value of values; let i = index" 
                 appScrollReveal animation="fade-in-up" [delay]="200 + (i * 50)"
                 class="group bg-navy-800/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-700 hover:border-primary-500/50 hover:bg-navy-800 transition-all duration-300">
              <h3 class="text-xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">{{ value.title }}</h3>
              <p class="text-gray-400 leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class TeamComponent {
  members = [
    {
      id: 'ives-de-saeger',
      name: 'Ives De Saeger',
      role: 'Founder & CEO',
      image: '/Ives-de-saeger.png'
    },
    {
      id: 'piotr-scheibe',
      name: 'Piotr Scheibe',
      role: 'CTO',
      image: '/Piotr.jpg'
    },
    {
      id: 'ennio-roels',
      name: 'Ennio Roels',
      role: 'Project & Sales Manager',
      image: '/ennio.jpg'
    }
  ];

  values = [
    {
      title: 'Righteousness',
      description: 'We are humans and mistakes happen. We help our colleagues without judgment and guide them.'
    },
    {
      title: 'Fairness',
      description: 'Everyone is valuable and an expert in his own area. Measures are equal for everybody.'
    },
    {
      title: 'Sincerity',
      description: 'We are sincere and authentic. We can be ourselves. Working as a team means supporting each other.'
    },
    {
      title: 'Impact',
      description: 'We choose to experience the slope rather than talking about it. We process an amazing amount of important work.'
    },
    {
      title: 'Freedom',
      description: 'We get the chance to use our talents in the areas we feel comfortable in. We are stimulated to learn and discover.'
    },
    {
      title: 'Focus',
      description: 'We are determined to identify root causes and find solutions. We look out for future challenges.'
    }
  ];
}
