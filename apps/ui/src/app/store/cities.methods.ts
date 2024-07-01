import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { CitiesState } from './cities.store';
import { CityService } from '../services/city.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export function withCitiesStoreMethods() {
  return signalStoreFeature(
    { state: type<CitiesState>() },
    withMethods((state, citiesService = inject(CityService)) => ({
      loadCities: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(state, { loading: true });
            return citiesService
              .getCities(state.page(), state.pageSize(), state.searchTerm())
              .pipe(
                tapResponse({
                  next: (data) =>
                    patchState(state, {
                      items: cleanCityNames(data.data),
                      total: data.total,
                    }),
                  error: (error) => {
                    console.log(
                      'Error getting cities on inital load: ' + error
                    );
                  },
                  finalize: () => patchState(state, { loading: false }),
                })
              );
          })
        )
      ),
      updateSearchTerm(searchTerm: string): void {
        console.log('searchTerm: ', searchTerm);
        patchState(state, {searchTerm })
      },
      updatePage(page: number): void {
        patchState(state, {page});
      },
      updatePageSize(pageSize: number): void {
        patchState(state, {pageSize})
      },
    }))
  );
}
function cleanCityNames(cities: string[]): string[] {
  return cities.map((city) => city.replace(/\r/g, ''));
}
