import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, Report, ReportDTO, Review, ReviewDTO, Tag, Theme, Tour, TourActions, TourDTO, TourSearchDTO } from '../dtos/tour';
import { User } from '../dtos/user';

/**
 * Service that handles the tour features.
 */
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieve a tour by its id.
   * @param tourId the id of the tour to retrieve
   * @returns the tour with the given id
   */
  public getById(tourId: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiUrl + '/tour/' + tourId)
  }

  /**
   * Retrieve actions available for the current user on the given tour.
   * @param tourId the id of the tour to retrieve the actions for
   * @returns the actions available for the current user on the given tour
   */
  public getAvailableActions(tourId: number): Observable<TourActions> {
    return this.http.get<TourActions>(environment.apiUrl + '/tour/' + tourId + '/availableActions')
  }

  /**
   * Retrieve the list of tours marked as completed by the current user.
   * @returns the list of tours marked as completed by the current user
   */
  public getCompletedTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/completed')
  }
  
  /**
   * Retrieve the list of tours shared with the current user.
   * @returns the list of tours shared with the current user
   */
  public getSharedTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/shared')
  }

  /**
   * Retrieve the list of tourists with whom the current guide shared his tour.
   * Only available for guides.
   * @param tourId the id of the tour to retrieve the shared tourists for
   * @returns the list of tourists with whom the current guide shared his tour
   */
  public getSharedTourists(tourId: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/tour/' + tourId + '/shared')
  }

  /**
   * Retrieve the list of tours created by the current guide.
   * Only available for guides.
   * @returns the list of tours created by the current guide
   */
  public getCreatedTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/created')
  }

  /**
   * Retrieve the list of tours that have been reported.
   * Only available for administrators.
   * @returns the list of tours that have been reported
   */
  public getReportedTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/reported')
  }

  /**
   * Retrieve the list of reports for the given tour.
   * @param tourId the id of the tour to retrieve the reports for
   * @returns the list of reports for the given tour
   */
  public getReports(tourId: number): Observable<Report[]> {
    return this.http.get<Report[]>(environment.apiUrl + '/tour/' + tourId + '/report')
  }

  /**
   * Retrieve the list of tours that match the given search criteria.
   * @param s the search criteria
   * @returns the list of tours that match the given search criteria
   */
  public search(s: TourSearchDTO): Observable<Tour[]> {
    // only add the parameters that are not null
    let params = new HttpParams()
    s.city ? params = params.append('cityId', s.city.id) : null
    s.approxDuration ? params = params.append('approxDuration', s.approxDuration) : null
    s.theme ? params = params.append('themeId', s.theme.id) : null
    s.tags ? params = params.appendAll({'tagIds': s.tags.map(t => t.id)}) : null
    return this.http.get<Tour[]>(environment.apiUrl + '/tour/search', { params })
  }

  // ---------
  // TAG AND THEME
  // ---------

  /**
   * Retrieve the list of all existing tags.
   * @returns the list of all existing tags
   */
  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.apiUrl + '/tag')
  }

  /**
   * Retrieve the list of all existing themes.
   * @returns the list of all existing themes
   */
  public getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.apiUrl + '/theme')
  }

  /**
   * Retrieve the list of all existing cities.
   * @returns the list of all existing cities
   */
  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(environment.apiUrl + '/city')
  }

  // -----

  /**
   * Create a new tour.
   * @param t the tour to create
   * @returns the created tour
   */
  public createTour(t: TourDTO): Observable<Tour> {
    // extract nested objects ids
    let mapped: any = {
      ...t, 
      cityId: t.city.id,
      themeId: t.theme.id,
      sharedTouristIds: t.sharedTourists?.map(t => t.id)
    }
    delete mapped.city
    delete mapped.theme
    delete mapped.sharedTourists
    return this.http.post<Tour>(environment.apiUrl + '/tour', mapped)
  }

  /**
   * Create a new review for the given tour.
   * Only available for tourists.
   * @param tourId the id of the tour to create the review for
   * @param r the review to create
   * @returns the created review
   */
  public createReview(tourId: number, r: ReviewDTO): Observable<Review> {
    return this.http.post<Review>(environment.apiUrl + '/tour/' + tourId + '/review', r)
  }

  /**
   * Create a new report for the given tour.
   * Only available for tourists.
   * @param tourId the id of the tour to create the report for
   * @param r the report to create
   * @returns the created report
   */
  public createReport(tourId: number, r: ReportDTO): Observable<Report> {
    return this.http.post<Report>(environment.apiUrl + '/tour/' + tourId + '/report', r)
  }

  // -----

  /**
   * Edit the given tour.
   * @param tourId the id of the tour to edit
   * @param t the edited tour
   * @returns the edited tour after save
   */
  public editTour(tourId: number, t: TourDTO): Observable<Tour> {
    // extract nested objects ids
    let mapped: any = {
      ...t,
      cityId: t.city.id,
      themeId: t.theme.id,
      sharedTouristIds: t.sharedTourists?.map(t => t.id)
    }
    delete mapped.city
    delete mapped.theme
    delete mapped.sharedTourists
    return this.http.patch<Tour>(environment.apiUrl + '/tour/' + tourId, mapped)
  }

  /**
   * Mark the given tour as completed.
   * Only available for tourists.
   * @param tourId the id of the tour to mark as completed
   * @returns completes when the action is done
   */
  public markAsCompleted(tourId: number): Observable<void> {
    return this.http.post<void>(environment.apiUrl + '/tour/' + tourId + '/completed', null)
  }

  /**
   * Deletes the given tour.
   * Only available for guides that are the creator of the tour.
   * @param tourId 
   * @returns completes when the action is done
   */
  public delete(tourId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/tour/' + tourId)
  }

}
