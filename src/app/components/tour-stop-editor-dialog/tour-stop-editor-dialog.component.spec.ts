import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStopEditorDialogComponent } from './tour-stop-editor-dialog.component';

describe('TourStopEditorDialogComponent', () => {
  let component: TourStopEditorDialogComponent;
  let fixture: ComponentFixture<TourStopEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourStopEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourStopEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
