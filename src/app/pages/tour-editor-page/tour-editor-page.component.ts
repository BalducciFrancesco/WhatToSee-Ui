import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, filter, forkJoin, map, startWith, switchMap } from 'rxjs';
import { Utils } from 'src/app/classes/utils';
import { StopEditorDialogComponent } from 'src/app/components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { City, StopDTO, Tag, Theme, Tour } from 'src/app/dtos/tour';
import { User, UserRole } from 'src/app/dtos/user';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  templateUrl: './tour-editor-page.component.html',
  styleUrls: ['./tour-editor-page.component.scss']
})
export class TourEditorPageComponent implements OnInit {

  savedTour?: Tour  // defined if edit mode
  savedSharedTourists?: User[] // defined if edit mode

  form = new FormGroup({
    title: new FormControl<string | null>(null, { validators: Validators.required }),
    description: new FormControl<string | null>(null, { validators: Validators.required }),
    city: new FormControl<City | null>(null, { validators: Validators.required }),
    tagNames: new FormControl<string[]>([], { nonNullable: true }),
    theme: new FormControl<Theme | null>(null, { validators: Validators.required }),
    approxCost: new FormControl<number | null>(null, { validators: Validators.required }),
    approxDuration: new FormControl<string | null>(null, { validators: Validators.required }),
    sharedTourists: new FormControl<User[]>([], { nonNullable: true }),  // disabled if not public (usernames only)
    isPublic: new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required }),
    stops: new FormControl<StopDTO[]>([], { validators: Validators.required }),
  });

  cityOptions$!: Observable<City[]>
  themeOptions$!: Observable<Theme[]>
  tagOptionsFilter$!: Observable<Tag[]>;
  touristOptionsFilter$!: Observable<User[]>;
  
  tagOptions: Tag[] = []
  tagInputControl = new FormControl()
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  touristOptions: User[] = []
  touristInputControl = new FormControl()
  @ViewChild('touristInput') touristInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private tourService: TourService,
    private dialogService: MatDialog,
    private userService: UserService,
    private notify: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check if edit mode
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      filter(tourId => tourId !== null),
      map(tourId => Number.parseInt(tourId)),
      switchMap(tourId => forkJoin(this.tourService.getById(tourId), this.tourService.getSharedTourists(Number(tourId))))
    ).subscribe(([tour, sharedTourists]) => {
      this.savedTour = tour
      this.savedSharedTourists = sharedTourists
      this.patchSaved()
    })

    // autocompletes
    this.cityOptions$ = this.tourService.getAllCities()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tourService.getAllTags().subscribe(tags => this.tagOptions = tags)
    this.userService.getAllByRole(UserRole.TOURIST).subscribe(tourists => this.touristOptions = tourists)

    // default disable shared tourist field
    this.form.controls.sharedTourists.disable()

    // triggers on edit
    this.form.controls.isPublic.valueChanges.subscribe(isPublic => {
      isPublic ? this.form.controls.sharedTourists.disable() : this.form.controls.sharedTourists.enable()
    })

    this.tagOptionsFilter$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((value: Tag | string | null) => this.filterTags(value)),
    );

    this.touristOptionsFilter$ = this.touristInputControl.valueChanges.pipe(
      startWith(null),
      map((value: User | string | null) => this.filterTourists(value)),
    );
  }

  patchSaved() {
    if(!this.savedTour) return;
    this.form.patchValue(JSON.parse(JSON.stringify(this.savedTour)))  // avoiding overwriting of nested objects
    this.form.controls.tagNames.setValue(this.savedTour.tags.map(t => t.name))
    this.form.controls.sharedTourists.setValue(JSON.parse(JSON.stringify(this.savedSharedTourists)))
  }

  openDialog(index?: number): void {  // new or edit
    let editStop = index !== undefined ? this.form.controls.stops.value![index] : undefined
    const dialogRef = this.dialogService.open(StopEditorDialogComponent, { data: editStop });
    dialogRef.afterClosed().subscribe((createdStop?: StopDTO) => {
      if(createdStop) {
        const stops = this.form.controls.stops.value!
        if(editStop !== undefined) {  // edit
          stops[index!] = createdStop
        } else {  // new
          stops.push(createdStop)
        }
        this.form.controls.stops.setValue(stops)
      }
    });
  }

  submit(): void {
    if(this.form.valid) {
      if(this.savedTour) {  // edit
        this.tourService.editTour(this.savedTour.id, Utils.nonEmptyFieldsOf(this.form.value)).subscribe((t: Tour) => {
          this.notify.open('Tour modificato con successo!', undefined, { panelClass: 'success-snackbar' })
          this.router.navigate(['/tour', t.id])
        })
      } else {  // create
        this.tourService.createTour(Utils.nonEmptyFieldsOf(this.form.value)).subscribe((t: Tour) => {
          this.notify.open('Tour creato con successo!', undefined, { panelClass: 'success-snackbar' })
          this.router.navigate(['/tour', t.id])
        })
      }
    }
  }

  // FIXME causes exceptions
  objCompareFn(o1: City | Theme | Tag, o2: City | Theme | Tag): boolean {
    return o1.id === o2.id
  }

  onStopReorder(event: CdkDragDrop<StopDTO[]>) {
    let arr = this.form.controls.stops.value!
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.form.controls.stops.setValue(arr)
  }

  onStopDelete(index: number) {
    let arr = this.form.controls.stops.value!
    arr.splice(index, 1)
    this.form.controls.stops.setValue(arr)
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
  
  addTagName(e: MatChipInputEvent): void {
    const newTag = e.value.trim().toLocaleLowerCase()
    if (!newTag) return;

    const tags = this.form.controls.tagNames.value!
    if (!tags.find(t => t.toLowerCase() == newTag.toLowerCase())) {
      // not already added - if is not between options will be added to DB
      tags.push(newTag)
      this.form.controls.tagNames.setValue(tags)
    }

    e.chipInput.clear()
    this.tagInputControl.setValue(null)
  }

  removeTagName(tag: string): void {
    const tags = this.form.controls.tagNames.value!
    tags.splice(tags.indexOf(tag), 1)
    this.form.controls.tagNames.setValue(tags)
  }

  selectedTag(e: MatAutocompleteSelectedEvent): void {
    const newTag: Tag = e.option.value
    if (!newTag) return;

    const tags = this.form.controls.tagNames.value!
    if (!tags.find(t => t === newTag.name)) {
      tags.push(newTag.name)
      this.form.controls.tagNames.setValue(tags)
    }
    
    this.tagInput.nativeElement.value = ''
    this.tagInputControl.setValue(null)
  }

  // ---------------
  // shared tourist autocomplete
  // ---------------

  private filterTourists(v: User | string | null): User[] {
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

  removeSharedTourist(sharedTourist: User): void {
    const sharedTourists = this.form.controls.sharedTourists.value!
    sharedTourists.splice(sharedTourists.indexOf(sharedTourist), 1)
    this.form.controls.sharedTourists.setValue(sharedTourists)
  }

  selectedSharedTourist(e: MatAutocompleteSelectedEvent): void {
    const newSharedTourist: User = e.option.value
    if (!newSharedTourist) return;

    const sharedTourists = this.form.controls.sharedTourists.value!
    if (!sharedTourists.find(t => t.id === newSharedTourist.id)) {
      sharedTourists.push(newSharedTourist)
      this.form.controls.sharedTourists.setValue(sharedTourists)
    }

    this.touristInput.nativeElement.value = ''
    this.touristInputControl.setValue(null)
  }
}
