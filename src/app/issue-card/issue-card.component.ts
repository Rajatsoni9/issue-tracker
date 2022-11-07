import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { PRIORITY_ICON } from "../app.constants";
import { Issue } from "../app.interfaces";

@Component({
  selector: "app-issue-card",
  templateUrl: "./issue-card.component.html",
  styleUrls: ["./issue-card.component.scss"],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
})
export class IssueCardComponent implements OnInit {
  @Input() issue: Issue;
  constructor() {}

  ngOnInit(): void {}

  getIcon(priority: string): string {
    return PRIORITY_ICON[priority];
  }
}
