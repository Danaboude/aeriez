import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('aeriez-app');
  protected isLoading = signal(true);

  ngOnInit() {
    // Determine if we should show the loader (e.g. on first visit)
    // For now, simple timeout to ensure assets are ready
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
}
