import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit, AfterViewInit {
  issuesTableDataSource: MatTableDataSource<Issue>;

  displayedColumns: string[] = [
    'id',
    'summary',
    'createdAt',
    'lastUpdated',
    'status',
    'priority',
  ];
  columnsToDisplay = this.displayedColumns.slice(1);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private issueService: IssueService) {
    this.issuesTableDataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.issueService.getAllIssues().subscribe((issues: Issue[] = []) => {
      this.issuesTableDataSource.data = [...issues];
    });
  }

  ngAfterViewInit(): void {
    this.issuesTableDataSource.sort = this.sort;
  }
}
