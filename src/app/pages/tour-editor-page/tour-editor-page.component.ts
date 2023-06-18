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

/**
 * Page for creating or editing a tour.
 */
@Component({
  templateUrl: './tour-editor-page.component.html',
  styleUrls: ['./tour-editor-page.component.scss']
})
export class TourEditorPageComponent implements OnInit {

  /**
   * Already created tour to edit.
   * Defined if is edit mode.
   */
  savedTour?: Tour

  /**
   * Already selected tourists to share the tour with.
   * Defined if is edit mode.
   */
  savedSharedTourists?: User[]

  /**
   * User input for creating or editing a tour.
   */
  form = new FormGroup({
    title: new FormControl<string | null>(null, { validators: Validators.required }),
    description: new FormControl<string | null>(null, { validators: Validators.required }),
    city: new FormControl<City | null>(null, { validators: Validators.required }),
    tagNames: new FormControl<string[]>([], { nonNullable: true }), // only keeping names
    theme: new FormControl<Theme | null>(null, { validators: Validators.required }),
    approxCost: new FormControl<number | null>(null, { validators: Validators.required }),
    approxDuration: new FormControl<string | null>(null, { validators: Validators.required }),
    sharedTourists: new FormControl<User[]>({ value: [], disabled: true }, { nonNullable: true }),  // disabled if not public (usernames only)
    isPublic: new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required }),
    stops: new FormControl<StopDTO[]>([], { validators: Validators.required }),
  });

  /**
   * Available option for the city field. Retrieved from backend.
   */
  cityOptions$!: Observable<City[]>

  /**
   * Available option for the theme field. Retrieved from backend.
   */
  themeOptions$!: Observable<Theme[]>

  /**
   * Available option for the tag field. Retrieved by filtering the tagOptions array with the user input.
   */
  tagOptionsFilter$!: Observable<Tag[]>;

  
  /**
   * Available option for the tourist field. Retrieved from backend.
  */
  tagOptions: Tag[] = []
  
  /**
   * Control element for the tag field. Needed to observe changes in the input value.
   */
  tagInputControl = new FormControl()

  /**
   * Input element for the tag field. Needed to attach the control element.
   */
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  /**
    * Available option for the tourist field. Retrieved by filtering the touristOptions array with the user input.
    */
  touristOptionsFilter$!: Observable<User[]>;
 
  /**
   * Available option for the tourist field. Retrieved from backend.
   */
  touristOptions: User[] = []

  /**
   * Control element for the tourist field. Needed to observe changes in the input value.
   */
  touristInputControl = new FormControl()

  /**
   * Input element for the tourist field. Needed to attach the control element.
   */
  @ViewChild('touristInput') touristInput!: ElementRef<HTMLInputElement>;

  /**
   * Keys whitelisted for triggering the tag input submit event.
   */
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
      map((param: ParamMap) => param.get('id')!), // retrieve id from route
      filter(tourId => tourId !== null),  // if null, then it is create mode (don't continue)
      map(tourId => Number.parseInt(tourId)),
      switchMap(tourId => forkJoin(this.tourService.getById(tourId), this.tourService.getSharedTourists(Number(tourId))))
    ).subscribe(([tour, sharedTourists]) => {
      // save retrieved data in case of form reset for editing mode, also populate form
      this.savedTour = tour
      this.savedSharedTourists = sharedTourists
      this.patchSaved()
    })

    // retrieve options for form fields from backend
    this.cityOptions$ = this.tourService.getAllCities()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tourService.getAllTags().subscribe(tags => this.tagOptions = tags)
    this.userService.getAllByRole(UserRole.TOURIST).subscribe(tourists => this.touristOptions = tourists)

    // when isPublic is changed, enable/disable sharedTourists field
    this.form.controls.isPublic.valueChanges.subscribe(isPublic => {
      isPublic ? this.form.controls.sharedTourists.disable() : this.form.controls.sharedTourists.enable()
    })

    // when user types in tag input, filter tagOptions
    this.tagOptionsFilter$ = this.tagInputControl.valueChanges.pipe(
      startWith(null),
      map((value: Tag | string | null) => this.filterTags(value)),
    );

    // when user types in tourist input, filter touristOptions
    this.touristOptionsFilter$ = this.touristInputControl.valueChanges.pipe(
      startWith(null),
      map((value: User | string | null) => this.filterTourists(value)),
    );
  }

  /**
   * When editing mode, populate form with saved data.
   */
  patchSaved(): void {
    if(!this.savedTour) return;
    this.form.patchValue(JSON.parse(JSON.stringify(this.savedTour)))  // avoiding overwriting of nested objects
    this.form.controls.tagNames.setValue(this.savedTour.tags.map(t => t.name))
    this.form.controls.sharedTourists.setValue(JSON.parse(JSON.stringify(this.savedSharedTourists)))
  }

  /**
   * When user clicks on create stop or edit stop, open dialog
   * @param indexToEdit the index of the stop to edit, undefined if is a new stop
   */
  openDialog(indexToEdit?: number): void { 
    let editStop = indexToEdit !== undefined ? this.form.controls.stops.value![indexToEdit] : undefined // attempt to find stop to edit
    const dialogRef = this.dialogService.open(StopEditorDialogComponent, { data: editStop }); // open dialog
    dialogRef.afterClosed().subscribe((createdStop?: StopDTO) => {
      if(createdStop) { // user submitted the dialog
        const stops = this.form.controls.stops.value!
        // check if have to replace or add stop
        if(editStop !== undefined) {  // edit
          stops[indexToEdit!] = createdStop
        } else {  // create
          stops.push(createdStop)
        }
        // update form value
        this.form.controls.stops.setValue(stops)
      }
    });
  }

  /**
   * User clicked on create button or pressed enter.
   */
  submit(): void {
    if(this.form.valid) {
      // check if submit to backend as create or edit
      if(this.savedTour) {  // edit
        this.tourService.editTour(this.savedTour.id, Utils.nonEmptyFieldsOf(this.form.value)).subscribe((t: Tour) => {
          //  tour saved, redirect to tour page
          this.notify.open('Tour modificato con successo!', undefined, { panelClass: 'success-snackbar' })
          this.router.navigate(['/tour', t.id])
        })
      } else {  // create
        this.tourService.createTour(Utils.nonEmptyFieldsOf(this.form.value)).subscribe((t: Tour) => {
          // tour created, redirect to tour page
          this.notify.open('Tour creato con successo!', undefined, { panelClass: 'success-snackbar' })
          this.router.navigate(['/tour', t.id])
        })
      }
    }
  }

  objCompareFn(o1: City | Theme | Tag, o2: City | Theme | Tag): boolean {
    return o1.id === o2.id
  }

  /**
   * When user finished dragging a stop, update the form value with the new order.
   * @param event the drag event
   */
  onStopReorder(event: CdkDragDrop<StopDTO[]>) {
    let arr = this.form.controls.stops.value!
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.form.controls.stops.setValue(arr)
  }

  /**
   * When user clicks on delete stop, remove it from the form value.
   * @param index the index of the stop to delete
   */
  onStopDelete(index: number) {
    let arr = this.form.controls.stops.value!
    arr.splice(index, 1)
    this.form.controls.stops.setValue(arr)
  }

  // ---------------
  // tag autocomplete
  // ---------------

  /**
   * Filter the tag options based on the user input.
   * @param v the user input (typed in the tag input)
   * @returns the filtered tag options to show
   */
  private filterTags(v: Tag | string | null): Tag[] {
    if(v && typeof v === 'string') {
      return this.tagOptions.filter(t => t.name.toLowerCase().includes(v.toLowerCase()))
    } else {
      return this.tagOptions.slice()
    }
  }
  
  /**
   * When user finished typing in the tag input, add the tag to the form value if is not already added.
   * @param e the input event
   */
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

  /**
   * When user clicks on the X button of a tag chip, remove the tag from the form value.
   * @param tag the tag to remove from the form value
   */
  removeTagName(tag: string): void {
    const tags = this.form.controls.tagNames.value!
    tags.splice(tags.indexOf(tag), 1)
    this.form.controls.tagNames.setValue(tags)
  }

  /**
   * When user selects a tag from the autocomplete dropdown, add the tag to the form value if is not already added.
   * @param e the selection event
   */
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

  /**
   * Filter the tourist options based on the user input.
   * @param v the user input (typed in the tourist input)
   * @returns the filtered tourist options to show
   */
  private filterTourists(v: User | string | null): User[] {
    if (v && typeof v === 'string') {
      return this.touristOptions.filter(t => t.username.toLowerCase().includes(v.toLowerCase()))
    } else {
      return this.touristOptions.slice()
    }
  }

  /**
   * When user selects a tourist from the autocomplete dropdown, add the tourist to the form value if is not already added.
   * @param e the selection event
   */
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

  /**
   * When user clicks on the X button of a shared tourist chip, remove the tourist from the form value.
   * @param sharedTourist the tourist to remove from the form value
   */
  removeSharedTourist(sharedTourist: User): void {
    const sharedTourists = this.form.controls.sharedTourists.value!
    sharedTourists.splice(sharedTourists.indexOf(sharedTourist), 1)
    this.form.controls.sharedTourists.setValue(sharedTourists)
  }

  /**
   * When user selects a tourist from the autocomplete dropdown, add the tourist to the form value if is not already added.
   * @param e the selection event
   */
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
