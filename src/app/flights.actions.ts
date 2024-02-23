import {createAction, props} from "@ngrx/store";
import {Flight} from "./model/flight";

export const loadFlights = createAction('[Flights Page] Load Flights');
export const loadFlightsSuccess = createAction(
    '[Flights API] Flights Loaded Success',
    props<{ flights: Flight[] }>(),
);

export const dataError = createAction(
    '[Flights API] Data Error',
    props<{ message: string}>()
);
export const loadFlight = createAction(
    '[Flights Page] Load Flight',
    props<{ id: string }>()
    );

export const loadFlightSuccess = createAction(
    '[Flights API] Flight Loaded Success',
    props<{ selectedFlight: Flight }>(),
);

export const createFlight = createAction(
    '[Flight Page] Create Flight',
    props<{ flight: Flight }>(),
)

export const createFlightSuccess = createAction(
    '[Flight Page] Create Flight Success',
    props<{ selectedFlight: Flight }>(),
)

export const updateFlight = createAction(
    '[Flight Page] Update Flight',
    props<{ selectedFlight: Flight }>(),
)
export const updateFlightSuccess = createAction(
    '[Flight Page] Update Flight Success',
    props<{ selectedFlight: Flight }>(),
)

export const deleteFlight = createAction(
    '[Flights Page] Delete Flight',
    props<{ id: string }>(),
)

export const deleteFlightSuccess = createAction(
    '[Flights Page] Delete Flight Success',
    props<{ selectedFlight: Flight }>(),
)