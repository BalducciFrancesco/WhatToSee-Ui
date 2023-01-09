import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TourStopEditorDialogComponent } from 'src/app/components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { City, Tag, TagDTO, Theme, TourStopDTO } from 'src/app/dtos/tour';
import { CityService } from 'src/app/services/city.service';
import { TourService } from 'src/app/services/tour.service';


// TODO reuse for editing / creation

@Component({
  selector: 'app-tour-editor-page',
  templateUrl: './tour-editor-page.component.html',
  styleUrls: ['./tour-editor-page.component.scss']
})
export class TourEditorPageComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    cityId: new FormControl<number>(-1, { nonNullable: true, validators: Validators.required }),
    tagsIds: new FormControl<TagDTO[]>([], { nonNullable: true, validators: Validators.required }),
    themeId: new FormControl<number>(-1, { nonNullable: true, validators: Validators.required }),
    approxCost: new FormControl<number>(-1, { nonNullable: true, validators: Validators.required }),
    approxDuration: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    stops: new FormControl<TourStopDTO[]>([], { nonNullable: true, validators: Validators.required })
  });

  cityOptions$!: Observable<City[]>
  tagsOptions$!: Observable<Tag[]>
  themeOptions$!: Observable<Theme[]>

  constructor(
    private cityService: CityService, 
    private tourService: TourService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.cityOptions$ = this.cityService.getAll()
    this.tagsOptions$ = this.tourService.getAllTags()
    this.themeOptions$ = this.tourService.getAllThemes()
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(TourStopEditorDialogComponent, { data: this.form.controls.stops.value.length });
    dialogRef.afterClosed().subscribe(createdStop => {
      this.form.patchValue({ stops: [...this.form.controls.stops.value, createdStop] })
    });
  }

  submit(): void {
    if(this.form.valid) 
      this.tourService.createTour(this.form.getRawValue())
  }

}
