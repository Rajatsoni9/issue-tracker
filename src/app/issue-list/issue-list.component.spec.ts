import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';

import { IssueListComponent } from './issue-list.component';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueListComponent],
      imports: [MatTableModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display table when issues are not available', async () => {
    component.issueList = [];
    await fixture.detectChanges();
    const noIssuesElement = fixture.debugElement.query(By.css('.no-issues'))
      .nativeElement as HTMLParagraphElement;
    expect(noIssuesElement).not.toBeNull();
    expect(noIssuesElement.textContent).toEqual('No issues available');
  });

  it('should not display table with values when issues are available', async () => {
    component.issueList = [
      {
        id: 1234,
        summary: 'testSummary',
        description: 'testDesctiption',
        priority: { name: 'Critical', value: 0, icon: 'testIcon' },
        status: { name: 'Open', value: 0 },
        createdAt: 1234,
        lastUpdated: 1234,
      },
    ];
    await fixture.detectChanges();
    const noIssuesElement = fixture.debugElement.query(By.css('.no-issues'));
    expect(noIssuesElement).toBeNull();

    const issuesTable = await loader.getHarness(MatTableHarness);
    const rows = await issuesTable.getRows();
    expect(rows.length).toEqual(1);

    const cells = await rows[0].getCells();
    expect(cells.length).toEqual(component.columnsToDisplay.length);

    const [
      summary,
      createdAt,
      updatedAt,
      status,
      priority,
    ] = await rows[0].getCellTextByIndex();
    expect(summary).toEqual('testSummary');
    expect(createdAt).toEqual('Jan 1, 1970');
    expect(updatedAt).toEqual('Jan 1, 1970');
    expect(status).toEqual('Open');
    expect(priority).toEqual('Critical');
  });
});
