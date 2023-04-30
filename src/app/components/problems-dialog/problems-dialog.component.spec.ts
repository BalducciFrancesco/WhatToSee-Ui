import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsDialogComponent } from './problems-dialog.component';

describe('ProblemsDialogComponent', () => {
  let component: ProblemsDialogComponent;
  let fixture: ComponentFixture<ProblemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
