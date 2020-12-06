import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    private formBuilder: FormBuilder
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
    this.matDialogRef.close({
      summary,
      description,
      priority: priority.name,
      status: status.name,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
    });
  }
}
