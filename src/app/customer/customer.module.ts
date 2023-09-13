import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SharedModule } from '../Shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    children: [{ path: 'list', component: CustomerDetailComponent }],
  },
];

@NgModule({
  declarations: [CustomerListComponent, CustomerDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CustomerModule {}
