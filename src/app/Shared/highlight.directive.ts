import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = false;
  @HostBinding('style.color') color: string = 'black';
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.fontSize') fontSize: string = '12px';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    //this.backgroundColor = 'blue';
    this.color = '#f24135';
    this.fontSize = '15px';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
  //  this.backgroundColor = 'transparent';
    this.color = 'black';
    this.fontSize = '12px';
  }
}
