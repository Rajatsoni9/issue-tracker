import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IssueCardComponent } from '../issue-card/issue-card.component';
import { KanbanComponent } from './kanban.component';


@NgModule({
    declarations: [KanbanComponent, IssueCardComponent],
    imports: [CommonModule, DragDropModule, MatCardModule,
        MatIconModule, RouterModule.forChild([{ path: '', component: KanbanComponent }])],
})
export class KanbanModule { }
