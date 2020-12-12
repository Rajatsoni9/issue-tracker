import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss'],
})
export class CreateIssueComponent implements OnInit {
  issueForm: FormGroup;

  priorities = [
    { name: 'Critical', value: 0 },
    { name: 'High', value: 1 },
    { name: 'Medium', value: 2 },
    { name: 'Low', value: 3 },
  ];

  statuses = [
    { name: 'Open', value: 0 },
    { name: 'In Progress', value: 1 },
    { name: 'Hold', value: 2 },
    { name: 'Done', value: 3 },
  ];

  constructor(
    private matDialogRef: MatDialogRef<CreateIssueComponent>,
    private formBuilder: FormBuilder,
    private issueService: IssueService,
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
