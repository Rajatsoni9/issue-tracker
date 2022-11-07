import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IssuesComponent } from "./issues/issues.component";

const routes: Routes = [
  {
    path: "issues",
    component: IssuesComponent,
    children: [
      { path: "kanban", loadChildren: () => import("./kanban/kanban.module").then(m => m.KanbanModule) },
      { path: "list", loadChildren: () => import("./issue-list/issue-list.module").then(m => m.IssueListModule) },
      { path: "", pathMatch: "full", redirectTo: "kanban" },
    ],
  },
  { path: "", pathMatch: "full", redirectTo: "/issues/kanban" },
  { path: "**", redirectTo: "/issues/kanban" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
