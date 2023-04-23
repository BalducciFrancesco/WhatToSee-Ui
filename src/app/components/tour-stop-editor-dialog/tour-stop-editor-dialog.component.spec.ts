import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopEditorDialogComponent } from './tour-stop-editor-dialog.component';

describe('StopEditorDialogComponent', () => {
  let component: StopEditorDialogComponent;
  let fixture: ComponentFixture<StopEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
