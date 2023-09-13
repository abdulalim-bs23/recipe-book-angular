import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  title: string = ' Customer List';

  customer: object = {
    name: '',
    avatarUrl: '',
  };

  customers: any[] = [
    {
      name: 'Tanjim Hasan',
      imageUrl: 'https://shorturl.at/dlzFM',
      email: 'tanjim@gmail.com',
    },
    {
      name: 'Nafiul Hamim',
      imageUrl: 'https://shorturl.at/dlzFM',
      email: 'nafiul@gmail.com',
    },
    {
      name: 'Masud Rana',
      imageUrl: 'https://shorturl.at/dlzFM',
      email: 'masud@gmail.com',
    },
  ];

  onClick(event: any): void {
    alert(event.target.innerHTML);
  }
}
