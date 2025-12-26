import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    @Input() rotationMax = 10;
    @Input() perspective = 1000;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
        this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate rotation based on percentage of position within the element
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // -1 to 1 range
        const xRot = (yPct - 0.5) * 2 * -this.rotationMax;
        const yRot = (xPct - 0.5) * 2 * this.rotationMax; // Invert X for natural feel

        this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            `perspective(${this.perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.02, 1.02, 1.02)`
        );
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s ease-out');
        this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        );
    }
}
