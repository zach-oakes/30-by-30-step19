import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightHttpService {
  private url = 'https://mock-json-server-five.vercel.app/flights';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.url);
  }

  getFlight(id: string): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.get<Flight>(url);
  }

  deleteFlight(id: string): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete<Flight>(url, this.httpOptions);
  }

  updateFlight(flight: Flight): Observable<any> {
    const url = `${this.url}/${flight.id}`;

    return this.http.put<Flight>(url, flight, this.httpOptions);
  }

  createFlight(flight: Flight): Observable<any> {
    return this.http.post<Flight>(this.url, flight, this.httpOptions);
  }
}
