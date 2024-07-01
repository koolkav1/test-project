import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CitiesState } from './cities.store';
import { computed } from '@angular/core';

export function withCitiesSelectors() {
  return signalStoreFeature(
    { state: type<CitiesState>() },
    withComputed(({ items }) => ({
      sortedCities: computed(() => {
        return items().sort();
      }),
    }))
  );
}
