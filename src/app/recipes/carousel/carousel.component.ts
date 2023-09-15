import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  slides: any[] = new Array(2).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../../assets/images/bg-01.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    };
    this.slides[1] = {
      src: '../../../assets/images/chicken-chickpea-curry.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    };
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
