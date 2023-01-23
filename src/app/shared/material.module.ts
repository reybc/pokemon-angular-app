import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
