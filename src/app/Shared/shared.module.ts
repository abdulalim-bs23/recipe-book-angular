import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './truncate.pipe';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [TruncatePipe, DropdownDirective],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe,
    DropdownDirective
  ],
})
export class SharedModule {}
