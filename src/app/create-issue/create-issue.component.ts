import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { PRIORITIES, STATUSES } from "../app.constants";
import { Issue } from "../app.interfaces";
import { IssueService } from "../issue.service";

@Component({
  selector: "app-create-issue",
  templateUrl: "./create-issue.component.html",
  styleUrls: ["./create-issue.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class CreateIssueComponent implements OnInit {
  issueForm: UntypedFormGroup;

  priorities: string[] = PRIORITIES;

  statuses: string[] = STATUSES;

  constructor(
    private matDialogRef: MatDialogRef<CreateIssueComponent>,
    private formBuilder: UntypedFormBuilder,
    private issueService: IssueService
  ) {
    this.issueForm = this.formBuilder.group(
      {
        summary: "",
        description: "",
        priority: "",
        status: "",
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
    this.issueService
      .createIssue(issue)
      .toPromise()
      .then(() => {
        this.matDialogRef.close();
      });
  }
}
