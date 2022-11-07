import { Routes } from "@angular/router";
import { IssuesComponent } from "./issues/issues.component";

export const routes: Routes = [
  {
    path: "issues",
    component: IssuesComponent,
    children: [
      { path: "kanban", loadComponent: () => import("./kanban/kanban.component").then(m => m.KanbanComponent) },
      {
        path: "list",
        loadComponent: () => import("./issue-list/issue-list.component").then(m => m.IssueListComponent),
      },
      { path: "", pathMatch: "full", redirectTo: "kanban" },
    ],
  },
  { path: "", pathMatch: "full", redirectTo: "/issues/kanban" },
  { path: "**", redirectTo: "/issues/kanban" },
];
