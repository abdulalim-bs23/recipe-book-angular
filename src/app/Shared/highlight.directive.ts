import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = false;
  @HostBinding('style.color') color: string = 'black';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    this.color = 'green';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    this.color = 'black';
  }
}
