import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreateIssueComponent } from "../create-issue/create-issue.component";

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: ["./issues.component.scss"],
})
export class IssuesComponent {
  constructor(private dialog: MatDialog) {}

  createIssue(): void {
    this.dialog.open(CreateIssueComponent, { width: "80vw" });
  }
}
