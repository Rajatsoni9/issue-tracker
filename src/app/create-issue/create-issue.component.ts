import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PRIORITIES, STATUSES } from '../app.constants';
import { Issue, IssuePriority, IssueStatus } from '../app.interfaces';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss'],
})
export class CreateIssueComponent implements OnInit {
  issueForm: FormGroup;

  priorities: IssuePriority[] = PRIORITIES;

  statuses: IssueStatus[] = STATUSES;

  constructor(
    private matDialogRef: MatDialogRef<CreateIssueComponent>,
    private formBuilder: FormBuilder,
    private issueService: IssueService
  ) {
    this.issueForm = this.formBuilder.group(
      {
        summary: '',
        description: '',
        priority: '',
        status: '',
      },
      { validators: Validators.required }
    );
  }

  ngOnInit(): void {}

  createIssue(): void {
    const { summary, description, priority, status } = this.issueForm.value;
    const issue: Issue = {
      id: Date.now(),
      summary,
      description,
      priority,
      status,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
    };
    this.issueService.createIssue(issue).subscribe(() => {
      this.matDialogRef.close();
    });
  }
}
