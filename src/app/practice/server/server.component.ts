import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  @Input() element: string | undefined;
  @ViewChild('listVal') child!: ElementRef;

  constructor() {
    console.log('constructor called');
  }
  ngOnInit() {
    console.log('Init called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngAfterViewInit() {
    console.log('this on change ' + this.child.nativeElement.textContent);
  }
}
