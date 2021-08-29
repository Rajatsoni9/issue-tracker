import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IssueListComponent } from './issue-list.component';

@NgModule({
  declarations: [IssueListComponent],
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: IssueListComponent }])
  ],
})
export class IssueListModule { }
