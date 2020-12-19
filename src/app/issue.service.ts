import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Issue } from './app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issues: Issue[] = [];
  constructor(private storage: StorageMap) {}

  createIssue(issue: Issue): Observable<void> {
    this.issues.push(issue);
    return this.storage.set('issues', this.issues);
  }

  getAllIssues(): Observable<Issue[]> {
    return this.storage.watch('issues').pipe(
      catchError(() => of([])),
      tap((issues: Issue[]) => {
        this.issues = issues ? issues : [];
      })
    );
  }

  updateIssue(issue: Issue): Observable<void> {
    const issueIndex = this.issues.findIndex((i: Issue) => i.id === issue.id);
    this.issues[issueIndex] = {...this.issues[issueIndex], ...issue};
    return this.storage.set('issues', this.issues);
  }
}
