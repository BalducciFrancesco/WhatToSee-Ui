import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/classes/utils';
import { City, Tag, Theme, Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

/**
 * Page for searching tours.
 */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  /**
   * User input for search tour criteria.
   * All fields are optional.
   */
  searchForm = new FormGroup({
    city: new FormControl<City | null>(null),
    approxDuration: new FormControl<string | null>(null),
    tags: new FormControl<Tag[] | null>(null),  // multiple selection
    theme: new FormControl<Theme | null>(null),
  })

  /**
   * Available option for the city field. Retrieved from backend.
   */
  cityOptions$!: Observable<City[]>

  /**
   * Available option for the theme field. Retrieved from backend.
   */
  themeOptions$!: Observable<Theme[]>

  /**
   * Available option for the tags field. Retrieved from backend.
   */
  tagsOptions$!: Observable<Tag[]>

  /**
   * Search results retrieved from backend after the user submitted the search form.
   */
  searchResults$?: Observable<Tour[]>

  constructor(private tourService: TourService,) {}

  ngOnInit(): void {
    // retrieve options for the form fields
    this.cityOptions$ = this.tourService.getAllCities()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tagsOptions$ = this.tourService.getAllTags()
  }

  /**
    * User pressed the search button or enter.
   */
  submitSearch(): void {
    if(this.searchForm.valid) {
      // retrieve and display search results
      this.searchResults$ = this.tourService.search(Utils.nonEmptyFieldsOf(this.searchForm.value))
    }
  }
  
}
