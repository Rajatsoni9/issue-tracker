import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from '../app.interfaces';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  constructor(private dialog: MatDialog, private issueService: IssueService) {}

  ngOnInit(): void {}

  createIssue(): void {
    this.dialog.open(CreateIssueComponent, { width: '70vw' });
  }
}
