import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './truncate.pipe';
import { DropdownDirective } from './dropdown.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselModule } from '@coreui/angular';
import { NavbarModule } from '@coreui/angular';
import { NavModule } from '@coreui/angular';
import { DropdownModule } from '@coreui/angular';

@NgModule({
  declarations: [TruncatePipe, DropdownDirective],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe,
    DropdownDirective,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,

    CarouselModule,
    NavbarModule,
    NavModule,
    DropdownModule,
  ],
})
export class SharedModule {}
