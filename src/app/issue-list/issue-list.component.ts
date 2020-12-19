import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  issueList: Issue[];

  displayedColumns: string[] = [
    'id',
    'summary',
    'createdAt',
    'lastUpdated',
    'status',
    'priority',
  ];
  columnsToDisplay = this.displayedColumns.slice(1);

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getAllIssues().subscribe((issues: Issue[]) => {
      this.issueList = [...issues];
    });
  }
}
