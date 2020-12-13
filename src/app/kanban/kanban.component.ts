import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../app.interfaces';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {
  @Input() issueList: Issue[];

  constructor() {}

  ngOnInit(): void {}
}
