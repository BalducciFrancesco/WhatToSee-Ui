import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TourStopEditorDialogComponent } from 'src/app/components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { City, Tag, TagDTO, Theme, Tour, TourStopDTO } from 'src/app/dtos/tour';
import { CityService } from 'src/app/services/city.service';
import { TourService } from 'src/app/services/tour.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


// TODO reuse for editing / creation

type TagControl = FormGroup<{
  name: FormControl<string>
}>

@Component({
  selector: 'app-tour-editor-page',
  templateUrl: './tour-editor-page.component.html',
  styleUrls: ['./tour-editor-page.component.scss']
})
export class TourEditorPageComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    cityId: new FormControl<number>(-1, { nonNullable: true, validators: Validators.required }),
    tags: new FormArray<TagControl>([], { validators: Validators.required }),
    theme: new FormGroup({
      name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    }),
    approxCost: new FormControl<number>(-1, { nonNullable: true, validators: Validators.required }),
    approxDuration: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    stops: new FormControl<TourStopDTO[]>([], { nonNullable: true, validators: Validators.required })
  });

  cityOptions$!: Observable<City[]>
  tagsOptions$!: Observable<Tag[]>
  themeOptions$!: Observable<Theme[]>

  separatorKeysCodes: number[] = [ENTER, COMMA];

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
      if(createdStop)
        this.form.patchValue({ stops: [...this.form.controls.stops.value, createdStop] })
    });
  }

  submit(): void {
    if(this.form.valid) {
      let t: any = this.form.getRawValue()
      t.tags = 
      this.tourService.createTour(this.form.getRawValue()).subscribe({
        next: (t: Tour) => {
          console.log('salvato');
        }, error: (e: Error) => console.log(e)
      })
    }
  }

  addTag(e: MatChipInputEvent): void {
    if (e.value.trim()) {
      this.form.controls.tags.push(new FormGroup({ name: new FormControl<string>(e.value, { nonNullable: true }) }))
      e.chipInput.clear()
    }
  }

  removeTag(name: string): void {
    const i = this.form.controls.tags.value.findIndex(t => t.name === name)
    if(i !== -1)
      this.form.controls.tags.removeAt(i)
  }

  selectedTag(e: MatAutocompleteSelectedEvent): void {
    this.form.controls.tags.push(new FormGroup({ name: new FormControl<string>(e.option.viewValue, { nonNullable: true }) }))
  }

}
