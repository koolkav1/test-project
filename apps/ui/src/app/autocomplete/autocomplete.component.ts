import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { CitiesStore } from '../store/cities.store';
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  imports: [ReactiveFormsModule],
  providers: [CitiesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit {
  isSelected = false;
  searchControl = new FormControl('');
  readonly store = inject(CitiesStore);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((query) => this.store.updateSearchTerm(query ?? ''))

    ).subscribe();
    const searchTerm = this.store.searchTerm;
    this.store.loadCities(searchTerm); // refetch cities eevrytime the value in the state changes
  }

  selectSuggestion(suggestion: string): void {
    this.searchControl.setValue(suggestion);
  }
}
