import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { IssueListComponent } from '../issue-list/issue-list.component';
import { KanbanComponent } from '../kanban/kanban.component';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let loader: HarnessLoader;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonToggleModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        IssuesComponent,
        IssueListComponent,
        KanbanComponent,
        CreateIssueComponent,
      ],
      providers: [{ provide: MatDialog, useValue: matDialogSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show IssueList when list is selected', async () => {
    const [listButtonToggle, kanbanButtonToggle] = await loader.getAllHarnesses(
      MatButtonToggleHarness
    );
    expect(await listButtonToggle.isChecked()).toEqual(true);
    expect(fixture.debugElement.query(By.css('app-issue-list'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-kanban'))).toBeNull();
  });

  it('should show AppKanban when kanban is selected', async () => {
    const [listButtonToggle, kanbanButtonToggle] = await loader.getAllHarnesses(
      MatButtonToggleHarness
    );
    expect(await kanbanButtonToggle.check());
    expect(fixture.debugElement.query(By.css('app-issue-list'))).toBeNull();
    expect(fixture.debugElement.query(By.css('app-kanban'))).not.toBeNull();
  });

  it('#createIssue opens dialog', () => {
    component.createIssue();
    expect(matDialogSpy.open).toHaveBeenCalledTimes(1);
  });
});
