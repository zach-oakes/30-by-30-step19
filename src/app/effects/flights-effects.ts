import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FlightHttpService} from "../service/flight-http.service";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {
    createFlight,
    createFlightSuccess, dataError, deleteFlight, deleteFlightSuccess, loadFlight,
    loadFlights,
    loadFlightsSuccess, loadFlightSuccess,
    updateFlight,
    updateFlightSuccess
} from "../flights.actions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class FlightsEffects {

    loadFlights$ = createEffect(() => this.actions$.pipe(
            ofType(loadFlights),
            exhaustMap(() => this.flightHttpService.getFlights()
                .pipe(
                    map(flights => (loadFlightsSuccess({flights}))),
                    catchError(() => of(dataError({ message: 'Load Flights Error'})))
                ))
        )
    );

    loadFlight$ = createEffect(() => this.actions$.pipe(
            ofType(loadFlight),
            exhaustMap(({id}) => this.flightHttpService.getFlight(id)
                .pipe(
                    map(selectedFlight => (loadFlightSuccess({selectedFlight}))),
                    catchError(() => of(dataError({ message: 'Load Flight Error'})))
                ))
        )
    );

    createFlight$ = createEffect(() => this.actions$.pipe(
        ofType(createFlight),
        exhaustMap((data) => this.flightHttpService.createFlight(data.flight)
            .pipe(
                map(selectedFlight => createFlightSuccess({selectedFlight})),
                catchError(() => of(dataError({ message: 'Create FLight Error'})))
            )
        )
    ));

    updateFlight$ = createEffect(() => this.actions$.pipe(
        ofType(updateFlight),
        exhaustMap((data) => this.flightHttpService.updateFlight(data.selectedFlight)
            .pipe(
                map(selectedFlight => updateFlightSuccess({selectedFlight})),
                catchError(() => of(dataError({ message: 'Update Flight Error'})))
            )
        )
    ));

    deleteFlight$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFlight),
        exhaustMap(({id}) => this.flightHttpService.deleteFlight(id)
            .pipe(
                map(selectedFlight => deleteFlightSuccess({selectedFlight})),
                catchError(() => of(dataError({ message: 'Delete Flight Error'})))
            )
        )
    ));

    dataFailure$ = createEffect(() => this.actions$.pipe(
            ofType(dataError),
            tap(({message}) => {
                this.snackBar.open(message, 'OK');
            })
        ), {dispatch: false}
    );

    constructor(private actions$: Actions,
                private flightHttpService: FlightHttpService,
                private snackBar: MatSnackBar) {
    }
}