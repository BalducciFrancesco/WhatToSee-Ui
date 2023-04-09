import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Utils } from 'src/app/classes/utils';
import { TourStopEditorDialogComponent } from 'src/app/components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { City, Tag, Theme, Tour, TourStopDTO } from 'src/app/dtos/tour';
import { Tourist } from 'src/app/dtos/user';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';


// TODO reuse for editing / creation

@Component({
  templateUrl: './tour-editor-page.component.html',
  styleUrls: ['./tour-editor-page.component.scss']
})
export class TourEditorPageComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string | null>(null, { validators: Validators.required }),
    description: new FormControl<string | null>(null, { validators: Validators.required }),
    city: new FormControl<City | null>(null, { validators: Validators.required }),
    tags: new FormControl<string[]>([]),
    theme: new FormControl<Theme | null>(null, { validators: Validators.required }),
    approxCost: new FormControl<number | null>(null, { validators: Validators.required }),
    approxDuration: new FormControl<string | null>(null, { validators: Validators.required }),
    sharedTourists: new FormControl<Tourist[]>([]),  // disabled if not public (usernames only)
    isPublic: new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required }),
    stops: new FormControl<TourStopDTO[]>([], { validators: Validators.required }),
  });

  cityOptions$!: Observable<City[]>
  themeOptions$!: Observable<Theme[]>
  tagOptionsFilter$!: Observable<Tag[]>;
  touristOptionsFilter$!: Observable<Tourist[]>;
  
  tagOptions: Tag[] = []
  tagInputControl = new FormControl()
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  touristOptions: Tourist[] = []
  touristInputControl = new FormControl()
  @ViewChild('touristInput') touristInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private tourService: TourService,
    private dialogService: MatDialog,
    private userService: UserService,
    private notify: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cityOptions$ = this.tourService.getAllCities()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tourService.getAllTags().subscribe(tags => this.tagOptions = tags)
    this.userService.getAllTourists().subscribe(tourists => this.touristOptions = tourists)
    this.form.controls.sharedTourists.disable()
    this.form.controls.isPublic.valueChanges.subscribe(isPublic => {
      isPublic ? this.form.controls.sharedTourists.disable() : this.form.controls.sharedTourists.enable()
    })
    this.tagOptionsFilter$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((value: Tag | string | null) => this.filterTags(value)),
    );
    this.touristOptionsFilter$ = this.touristInputControl.valueChanges.pipe(
      startWith(null),
      map((value: Tourist | string | null) => this.filterTourists(value)),
    );
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(TourStopEditorDialogComponent);
    dialogRef.afterClosed().subscribe((createdStop?: TourStopDTO) => {
      if(createdStop) {
        const stops = this.form.controls.stops.value!
        stops.push(createdStop)
        this.form.controls.stops.setValue(stops)
      }
    });
  }

  submit(): void {
    if(this.form.valid) {
      this.tourService.createTour(Utils.nonEmptyFieldsOf(this.form.value)).subscribe({
        next: (t: Tour) => {
          this.notify.open('Tour creato con successo!')
          this.router.navigate(['/tour', t.id])
        }, error: (e: Error) => console.log(e)
      })
    } else {
      console.error('invalid fields: ', Utils.findInvalidControls(this.form));
    }
  }

  // ---------------
  // tag autocomplete
  // ---------------

  private filterTags(v: Tag | string | null): Tag[] {
    if(v && typeof v === 'string') {
      return this.tagOptions.filter(t => t.name.toLowerCase().includes(v.toLowerCase()))
    } else {
      return this.tagOptions.slice()
    }
  }
  
  addTag(e: MatChipInputEvent): void {
    const newTag = e.value.trim().toLocaleLowerCase()
    if (!newTag) return;

    const tags = this.form.controls.tags.value!
    if (!tags.find(t => t.toLowerCase() == newTag.toLowerCase())) {
      // not already added - if is not between options will be added to DB
      tags.push(newTag)
      this.form.controls.tags.setValue(tags)
    }

    e.chipInput.clear()
    this.tagInputControl.setValue(null)
  }

  removeTag(tag: string): void {
    const tags = this.form.controls.tags.value!
    tags.splice(tags.indexOf(tag), 1)
    this.form.controls.tags.setValue(tags)
  }

  selectedTag(e: MatAutocompleteSelectedEvent): void {
    const newTag: Tag = e.option.value
    if (!newTag) return;

    const tags = this.form.controls.tags.value!
    if (!tags.find(t => t === newTag.name)) {
      tags.push(newTag.name)
      this.form.controls.tags.setValue(tags)
    }
    
    this.tagInput.nativeElement.value = ''
    this.tagInputControl.setValue(null)
  }

  // ---------------
  // shared tourist autocomplete
  // ---------------

  private filterTourists(v: Tourist | string | null): Tourist[] {
    if (v && typeof v === 'string') {
      return this.touristOptions.filter(t => t.username.toLowerCase().includes(v.toLowerCase()))
    } else {
      return this.touristOptions.slice()
    }
  }

  addSharedTourist(e: MatChipInputEvent): void {
    let newSharedTouristUsername = e.value.trim().toLowerCase()
    if (!newSharedTouristUsername) return;

    const sharedTourists = this.form.controls.sharedTourists.value!
    const option = this.touristOptions.find(t => t.username === newSharedTouristUsername)
    if (!sharedTourists.find(t => t.username === newSharedTouristUsername) && option) {
      // not already added and within available options
      sharedTourists.push(option)
      this.form.controls.sharedTourists.setValue(sharedTourists)
    }

    e.chipInput.clear()
    this.touristInputControl.setValue(null)
  }

  removeSharedTourist(sharedTourist: Tourist): void {
    const sharedTourists = this.form.controls.sharedTourists.value!
    sharedTourists.splice(sharedTourists.indexOf(sharedTourist), 1)
    this.form.controls.sharedTourists.setValue(sharedTourists)
  }

  selectedSharedTourist(e: MatAutocompleteSelectedEvent): void {
    const newSharedTourist: Tourist = e.option.value
    if (!newSharedTourist) return;

    const sharedTourists = this.form.controls.sharedTourists.value!
    if (!sharedTourists.find(t => t === newSharedTourist)) {
      sharedTourists.push(newSharedTourist)
      this.form.controls.sharedTourists.setValue(sharedTourists)
    }

    this.touristInput.nativeElement.value = ''
    this.touristInputControl.setValue(null)
  }
}
