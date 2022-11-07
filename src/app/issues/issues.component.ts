import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { CreateIssueComponent } from "../create-issue/create-issue.component";

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: ["./issues.component.scss"],
  standalone: true,
  imports: [RouterModule, MatButtonModule],
})
export class IssuesComponent {
  constructor(private dialog: MatDialog) {}

  createIssue(): void {
    this.dialog.open(CreateIssueComponent, { width: "80vw" });
  }
}
