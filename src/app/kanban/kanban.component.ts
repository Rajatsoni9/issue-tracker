import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { STATUSES } from '../app.constants';
import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

export interface Lane {
  id: number;
  name: string;
  issues: Issue[];
}
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  private issueList: Issue[];
  issueListSubscription: Subscription;
  lanes: Lane[];

  constructor(private issueService: IssueService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.issueListSubscription = this.issueService
      .getAllIssues()
      .subscribe((issues: Issue[] = []) => {
        this.issueList = [...issues];
        this.lanes = STATUSES.map((status) => {
          return {
            name: status.name,
            id: status.value,
            issues: this.getIssuesByStatus(status.name),
          };
        });
      });
  }

  getIssuesByStatus(status: string): Issue[] {
    return this.issueList.filter(
      (issue: Issue) => issue.status.name === status
    );
  }

  drop(event: CdkDragDrop<Issue[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const issue: Issue = {
        ...event.item.data,
        status: STATUSES[event.container.id],
      };
      this.issueService
        .updateIssue(issue)
        .toPromise()
        .then(() => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        });
    }
  }

  viewIssue(issue: Issue): void {
    this.dialog.open(ViewIssueComponent, {width: '80vw', data: issue});
  }

  ngOnDestroy(): void {
    this.issueListSubscription.unsubscribe();
  }
}
