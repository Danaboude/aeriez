import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SectionContainerComponent } from '@shared/components/section-container/section-container.component';
import { ScrollRevealDirective } from '@core/directives/scroll-reveal.directive';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
    selector: 'app-member-profile',
    standalone: true,
    imports: [CommonModule, SectionContainerComponent, ScrollRevealDirective, ButtonComponent, RouterModule],
    template: `
    <div class="pt-20">
      <app-section-container className="bg-navy-900 text-white min-h-[60vh] flex items-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <!-- Image -->
          <div appScrollReveal animation="scale-in" class="col-span-1">
            <div class="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border-4 border-white/10">
              <img [src]="member()?.image" [alt]="member()?.name" class="w-full h-full object-cover">
            </div>
          </div>
          
          <!-- Content -->
          <div appScrollReveal animation="slide-in-right" [delay]="200" class="col-span-1 md:col-span-2">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ member()?.name }}</h1>
            <p class="text-2xl text-primary-400 mb-8 font-medium">{{ member()?.role }}</p>
            
            <div class="prose prose-lg prose-invert max-w-none text-gray-300 mb-12">
              <p class="mb-6 leading-relaxed">
                {{ member()?.bio }}
              </p>
              <p class="leading-relaxed">
                "{{ member()?.quote }}"
              </p>
            </div>
            
            <div class="flex gap-4">
              <app-button variant="primary" iconRight="fas fa-envelope">Contact {{ member()?.firstName }}</app-button>
              <a routerLink="/team" class="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors">
                Back to Team
              </a>
            </div>
          </div>
        </div>
      </app-section-container>
    </div>
  `
})
export class MemberProfileComponent implements OnInit {
    member = signal<any>(null);

    @Input() id = '';

    private membersData = {
        'ives-de-saeger': {
            name: 'Ives De Saeger',
            firstName: 'Ives',
            role: 'Founder & CEO',
            image: '/ives.jpg',
            bio: 'My focus lies on how technology has an impact on culture, resulting in sustainable improvement and anticipating on potential issues. My goal is a harmonized and stress-reduced organization.',
            quote: 'Every company needs organisation and every organisation is made by people.'
        },
        'piotr-scheibe': {
            name: 'Piotr Scheibe',
            firstName: 'Piotr',
            role: 'CTO',
            image: '/Piotr.jpg',
            bio: 'With over 15 years of experience as a system integrator, I am eager to bring my expertise, innovative mindset, and passion for cutting-edge technology to a dynamic and forward-thinking organization.',
            quote: 'I am the CTO of aeriez because of my motivation to take Industry 4.0 to the next level.'
        },
        'ennio-roels': {
            name: 'Ennio Roels',
            firstName: 'Ennio',
            role: 'Project & Sales Manager',
            image: '/ennio.jpg',
            bio: 'As a psychological counselor I believe people are the centre of society and every organization. Real people, their thoughts, beliefs, perspectives and decisions define the course of an organization.',
            quote: 'The potential can be raised through clear communication and collecting input of all stakeholders.'
        }
    };

    ngOnInit() {
        // In a real app, this would come from a service
        // @Input id comes from router variable binding if enabled or standard ActivatedRoute
        // Here assuming withComponentInputBinding is enabled or passed manually
        if (this.id && this.membersData[this.id as keyof typeof this.membersData]) {
            this.member.set(this.membersData[this.id as keyof typeof this.membersData]);
        } else {
            // Fallback or load based on route param if not using input binding
            // For now, defaulting to Ives if no ID or invalid
            // this.member.set(this.membersData['ives-de-saeger']);
        }
    }
}
