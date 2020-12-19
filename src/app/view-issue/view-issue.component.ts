import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PRIORITIES, STATUSES } from '../app.constants';
import { Issue, IssuePriority, IssueStatus } from '../app.interfaces';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.scss'],
})
export class ViewIssueComponent implements OnInit {
  issueForm: FormGroup;

  priorities: IssuePriority[] = PRIORITIES;

  statuses: IssueStatus[] = STATUSES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public issue: Issue,
    private matDialogRef: MatDialogRef<ViewIssueComponent>,
    private issueService: IssueService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.issueForm = this.formBuilder.group(
      {
        summary: this.issue.summary,
        description: this.issue.description,
        priority: this.issue.priority.value,
        status: this.issue.status.value,
      },
      { validators: Validators.required }
    );
  }

  deleteIssue(): void {
    this.issueService
      .deleteIssue(this.issue)
      .toPromise()
      .then(() => {
        this.matDialogRef.close();
      })
      .catch(() => {});
  }

  saveIssueDetails(): void {
    if (this.issueForm.valid && this.issueForm.dirty) {
      const { summary, description, priority, status } = this.issueForm.value;
      const updatedIssue: Issue = {
        ...this.issue,
        summary,
        description,
        priority: this.priorities[priority],
        status: this.statuses[status],
        lastUpdated: Date.now(),
      };
      this.issueService
        .updateIssue(updatedIssue)
        .toPromise()
        .then(() => {
          this.matDialogRef.close();
        });
    } else {
      this.matDialogRef.close();
    }
  }
}