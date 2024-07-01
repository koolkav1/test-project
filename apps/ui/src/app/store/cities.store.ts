import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withCitiesStoreMethods } from './cities.methods';

export interface CitiesState {
  items: string[];
  loading: boolean;
  selectedCity: string;
  searchTerm: string;
  page: number;
  pageSize: number;
  total: number;
}

export const initialState: CitiesState = {
  items: [],
  loading: false,
  selectedCity: '',
  searchTerm: '',
  page: 1,
  pageSize: 100,
  total: 0,
};
export const CitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCitiesStoreMethods(),
  withHooks({
    onInit({ loadCities }) {
      loadCities();
    },
  })
);

export type CitiesStore = InstanceType<typeof CitiesStore>;
