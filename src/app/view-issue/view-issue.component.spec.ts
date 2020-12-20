import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { IssueService } from '../issue.service';
import { ViewIssueComponent } from './view-issue.component';

describe('ViewIssueComponent', () => {
  let component: ViewIssueComponent;
  let fixture: ComponentFixture<ViewIssueComponent>;
  let loader: HarnessLoader;
  let issueServiceSpy: jasmine.SpyObj<IssueService>;
  beforeEach(async () => {
    issueServiceSpy = jasmine.createSpyObj('IssueService', ['updateIssue']);
    await TestBed.configureTestingModule({
      declarations: [ViewIssueComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            summary: 'testSummary',
            description: 'testDescription',
            priority: { name: 'Critical', value: 0, icon: 'testIcon' },
            status: { name: 'Open', value: 0 },
          },
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: IssueService, useValue: issueServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', async () => {
    expect(
      fixture.debugElement.query(By.css('.summary-editor')).nativeElement
        .textContent
    ).toEqual('testSummary');
    expect(
      fixture.debugElement.query(By.css('.description-editor')).nativeElement
        .textContent
    ).toEqual('testDescription');
    const [prioritySelect, statusSelect] = await loader.getAllHarnesses(
      MatSelectHarness
    );
    const prioritySelectValue = await prioritySelect.getValueText();
    expect(prioritySelectValue).toEqual('Critical');
    const statusSelectValue = await statusSelect.getValueText();
    expect(statusSelectValue).toEqual('Open');
  });

  it('should save the changed issue details on close button click', async () => {
    issueServiceSpy.updateIssue.and.returnValue(of());
    const [prioritySelect, statusSelect] = await loader.getAllHarnesses(
      MatSelectHarness
    );
    const [deleteButton, closeButton] = await loader.getAllHarnesses(
      MatButtonHarness
    );
    await prioritySelect.open();
    const highPriorityOption = await prioritySelect.getOptions({
      text: 'High',
    });
    expect(component.issueForm.get('priority').value).toEqual(0);
    await highPriorityOption[0].click();
    expect(component.issueForm.get('priority').value).toEqual(1);
    await closeButton.click();
    expect(issueServiceSpy.updateIssue).toHaveBeenCalledTimes(1);
  });
});
