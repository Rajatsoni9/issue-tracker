import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { STATUSES } from '../app.constants';
import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';

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
export class KanbanComponent implements OnInit {
  private issueList: Issue[];

  lanes: Lane[];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getAllIssues().subscribe((issues: Issue[]) => {
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
