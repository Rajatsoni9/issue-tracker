import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../app.interfaces';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  @Input() issueList: Issue[];

  displayedColumns: string[] = [
    'id',
    'summary',
    'createdAt',
    'lastUpdated',
    'status',
    'priority',
  ];
  columnsToDisplay = this.displayedColumns.slice(1);

  constructor() {}

  ngOnInit(): void {}
}
