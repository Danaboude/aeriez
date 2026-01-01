import { Injectable, Inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type SeasonType = 'christmas' | 'easter' | 'none';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    rotation?: number;
    rotationSpeed?: number;
    type: 'snow' | 'egg' | 'confetti';
    landed?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SeasonalEffectsService implements OnDestroy {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private animationId: number | null = null;
    private particles: Particle[] = [];
    private textBounds: DOMRect[] = [];
    private currentSeason: SeasonType = 'none';
    private resizeObserver: ResizeObserver | null = null;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private ngZone: NgZone
    ) { }

    setSeason(season: SeasonType) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.currentSeason = season;

        if (season === 'none') {
            this.destroyCanvas();
            return;
        }

        if (!this.canvas) {
            this.createCanvas();
        }

        this.resetParticles();
        this.updateTextBounds();
        this.startAnimation();
    }

    private createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none'; // Click-through
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
            this.updateTextBounds();
        });
        this.resizeObserver.observe(document.body);

        this.resizeCanvas();
    }

    private resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    private destroyCanvas() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        if (this.canvas) {
            document.body.removeChild(this.canvas);
            this.canvas = null;
            this.ctx = null;
        }
        this.particles = [];
    }

    private resetParticles() {
        this.particles = [];
        if (!this.canvas) return;

        const count = this.currentSeason === 'christmas' ? 150 : 80;
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(true));
        }
    }

    private createParticle(randomY: boolean = false): Particle {
        const width = this.canvas ? this.canvas.width : window.innerWidth;
        const height = this.canvas ? this.canvas.height : window.innerHeight;

        const x = Math.random() * width;
        const y = randomY ? Math.random() * height : -20;

        if (this.currentSeason === 'christmas') {
            return {
                x,
                y,
                vx: (Math.random() - 0.5) * 1.5, // Slight horizontal drift
                vy: 1 + Math.random() * 2, // Falling speed
                radius: 1 + Math.random() * 3,
                color: 'rgba(255, 255, 255, 0.8)',
                type: 'snow'
            };
        } else {
            // Easter - Eggs and Confetti
            const isEgg = Math.random() > 0.5;
            const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
            return {
                x,
                y,
                vx: (Math.random() - 0.5) * 2,
                vy: 2 + Math.random() * 3,
                radius: isEgg ? 6 + Math.random() * 4 : 3 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 5,
                type: isEgg ? 'egg' : 'confetti'
            };
        }
    }

    private updateTextBounds() {
        // Cache the bounding boxes of text elements to avoid layout thrashing
        const selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span.highlight', 'a.nav-link'];
        this.textBounds = [];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Only consider elements currently in view or mostly likely to be hit
                if (rect.width > 0 && rect.height > 0) {
                    // We need to account for scrolling since canvas is fixed
                    this.textBounds.push({
                        ...rect,
                        top: rect.top + window.scrollY,
                        bottom: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                        right: rect.right + window.scrollX,
                        x: rect.x + window.scrollX,
                        y: rect.y + window.scrollY,
                        width: rect.width,
                        height: rect.height,
                        toJSON: rect.toJSON
                    });
                }
            });
        });
    }

    private startAnimation() {
        this.ngZone.runOutsideAngular(() => {
            const loop = () => {
                if (this.currentSeason === 'none') return;
                this.update();
                this.draw();
                this.animationId = requestAnimationFrame(loop);
            };

            if (this.animationId) cancelAnimationFrame(this.animationId);
            this.animationId = requestAnimationFrame(loop);
        });
    }

    private update() {
        if (!this.canvas) return;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const scrollY = window.scrollY;

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            if (p.landed) {
                // Maybe melt or disappear after some time?
                // For now, just let them sit there until they scroll off or we could fade them
                // To keep it simple and clean, we'll respawn them if they go off screen
                if (p.y - scrollY > height || p.y - scrollY < -50) {
                    this.particles[i] = this.createParticle();
                }
                continue;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
                p.rotation += p.rotationSpeed;
            }

            // Physics interactions with Mouse can be added here if needed

            // Collision with text
            // We check if the particle is within the bounds of any text element
            // Since canvas is fixed 0,0, but particles have absolute coordinates relative to screen + scroll?
            // Actually my particle system is effectively in "world space" if I add vy. 
            // But wait, the canvas is `fixed`. So `0,0` on canvas is top-left of viewport.
            // So if a particle is at `y=100`, it is 100px from top of viewport.
            // My `textBounds` added `scrollY`.
            // So I need to compare `p.y + scrollY` (world pos) vs `textBound.top` (world pos).
            // NO. Canvas is fixed.
            // p.y is relative to the VIEWPORT (canvas).
            // textBound.top is relative to the DOCUMENT (because I added scrollY).
            // So collision check:
            // particleWorldY = p.y + scrollY
            // particleWorldX = p.x + scrollX

            const pWorldX = p.x + window.scrollX;
            const pWorldY = p.y + window.scrollY;

            // Simple optimization: only check bounds near the particle
            // But brute force is probably fine for < 200 particles and < 50 text elements

            let landed = false;

            // Only snow lands on text for now, eggs bounce or land? Let's make snow land.
            if (this.currentSeason === 'christmas') {
                for (const rect of this.textBounds) {
                    // Check if particle is just above the top edge of the text
                    if (pWorldX >= rect.left && pWorldX <= rect.right) {
                        if (Math.abs(pWorldY - rect.top) < 5) {
                            p.landed = true;
                            landed = true;
                            // Adjust y to sit exactly on top relative to viewport
                            // rect.top is world space. p.y should be (rect.top - scrollSinceUpdate?)
                            // Actually, if we just freeze it in world space, we need p.y to move with scroll?
                            // If canvas is fixed, p.y must change when we scroll if we want it to look attached to text.
                            // Implementation detail: If we want "landed" particles to scroll with text, 
                            // we might need to store "offset from text" or just simpler: 
                            // Don't land permanently. Maybe just pause for a bit then fall through?
                            // Or simple: "Landed" particles stop moving X/Y in simulation, 
                            // BUT we must adjust their draw position by scroll delta?
                            // Complexity spike.
                            // Simpler approach: It lands, stays for 1-2 seconds, then melts/falls.
                            // For "land on text", simply stopping vy is enough if we weren't scrolling.
                            // With scrolling, fixed canvas means "landed" snow will slide relative to text.
                            // To fix this without complex camera logic: simpler effect -> they slow down passing text.

                            // Alternative: "p.landed" means we store its WORLD coordinate, and in draw() we verify where it is relative to viewport.
                        }
                    }
                }
            }

            // Respawn if out of view
            if (p.y > height) {
                this.particles[i] = this.createParticle();
            }

            // Wrap X
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;
        }
    }

    private draw() {
        if (!this.canvas || !this.ctx) return;
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.ctx.clearRect(0, 0, width, height);

        for (const p of this.particles) {
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();

            if (p.type === 'snow') {
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (p.type === 'egg') {
                // Draw an egg (oval)
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation || 0) * Math.PI / 180);
                this.ctx.scale(1, 1.4); // Stretch Y to make oval
                this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else {
                // Confetti (rect)
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation || 0) * Math.PI / 180);
                this.ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
                this.ctx.restore();
            }
        }
    }

    ngOnDestroy() {
        this.destroyCanvas();
    }
}
