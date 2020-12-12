import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { Issue } from './app.interfaces';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageMap,
          useFactory: () => {
            const storage = {};
            return {
              set: (key: string, value: any) => {
                storage[key] = value;
                return of(undefined);
              },
              get: (key: string) => {
                return of(storage[key]);
              },
              watch: (key: string) => {
                return of(storage[key]);
              },
            };
          },
        },
      ],
    });
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should add issue to storage', (done) => {
    const issue: Issue = {
      id: 123456789,
      summary: 'testSummary',
      description: 'testDescription',
      priority: { name: 'testPriority', value: 0 },
      status: { name: 'testStaus', value: 0 },
      createdAt: 123456789,
      lastUpdated: 123456789,
    };
    service.createIssue(issue);
    expect(service.issues[0]).toEqual(issue);
    service.getAllIssues().subscribe((issues) => {
      expect(issues[0]).toEqual(issue);
      done();
    });
  });
});
