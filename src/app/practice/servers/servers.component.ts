import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  servers : any = [];



  onReceive(aa: string): void { 
    alert(aa);
  }

  receiveServer(data: any) {
    this.servers.push(data);
  }
}
