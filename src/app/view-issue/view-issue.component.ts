import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";

import { PRIORITIES, STATUSES } from "../app.constants";
import { Issue } from "../app.interfaces";
import { IssueService } from "../issue.service";

@Component({
  selector: "app-view-issue",
  templateUrl: "./view-issue.component.html",
  styleUrls: ["./view-issue.component.scss"],
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    TextFieldModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
})
export class ViewIssueComponent implements OnInit {
  issueForm: UntypedFormGroup;

  priorities: string[] = PRIORITIES;

  statuses: string[] = STATUSES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public issue: Issue,
    private matDialogRef: MatDialogRef<ViewIssueComponent>,
    private issueService: IssueService,
    private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.issueForm = this.formBuilder.group(
      {
        summary: this.issue.summary,
        description: this.issue.description,
        priority: this.issue.priority,
        status: this.issue.status,
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
        priority,
        status,
        lastUpdated: Date.now(),
      };
      this.issueService
        .updateIssue(updatedIssue)
        .toPromise()
        .then(() => {
          this.matDialogRef.close();
        })
        .catch(() => {
          this.snackBar.open("Browser storage unavailable!", null, {
            duration: 3000,
          });
        });
    } else {
      this.matDialogRef.close();
    }
  }
}
