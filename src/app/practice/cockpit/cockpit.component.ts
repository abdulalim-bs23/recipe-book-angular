import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
@Output() serverElement = new Subject<{name: string}>();

  addServer(serverInput: any) {
    this.serverElement.next(serverInput.value);
  }
}
