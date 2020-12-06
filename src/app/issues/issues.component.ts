import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from '../app.interfaces';
import { CreateIssueComponent } from '../create-issue/create-issue.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issueList: Issue[] = [];
  displayedColumns: string[] = [
    'id',
    'summary',
    'createdAt',
    'lastUpdated',
    'status',
    'priority',
  ];
  columnsToDisplay = this.displayedColumns.slice(1);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  createIssue(): void {
    const dialog = this.dialog.open(CreateIssueComponent, { width: '70vw' });
    dialog.afterClosed().subscribe((issue: Issue) => {
      this.issueList = issue ? [...this.issueList, issue] : this.issueList;
    });
  }
}
