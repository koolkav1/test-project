import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AutocompleteComponent } from './autocomplete.component';
import { CitiesStore } from '../store/cities.store';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  let httpTestingController: HttpTestingController;
  let citiesStore: jest.Mocked<InstanceType<typeof CitiesStore>>;
  beforeEach(waitForAsync(() => {
    // Signal stores are quite new(still in developer preview), and Jest mocks are not yet compatible.
    // const citiesStoreMock: Partial<jest.Mocked<InstanceType<typeof CitiesStore>>> = {
    //   updateSearchTerm: jest.fn(),
    //   loadCities: jest.fn().mockReturnValue(of([])) as any,
    //   items: jest.fn().mockReturnValue(of(['New York', 'Los Angeles', 'Chicago'])) as any,
    //   searchTerm: 'New York' as any,
    // };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,  AutocompleteComponent],
      declarations: [],
      providers: [CitiesStore, provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    citiesStore = TestBed.inject(CitiesStore) as jest.Mocked<InstanceType<typeof CitiesStore>>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should create', waitForAsync(() => {
    fixture.detectChanges();

    // Simulate HTTP requests for initial load
    const reqs = httpTestingController.match('http://localhost:3000/api/text?page=1&pageSize=100');
    reqs.forEach(req => req.flush([]));

    expect(component).toBeTruthy();
  }));
  it('should call updateSearchTerm on input change', waitForAsync(() => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'San Francisco';
    input.dispatchEvent(new Event('input'));

    setTimeout(() => {
      fixture.detectChanges();


      // Simulate HTTP request and response
      const req = httpTestingController.expectOne('http://localhost:3000/api/text?page=1&pageSize=100&search=San%20Francisco');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    }, 400);
  }));

  it('should display suggestions based on search input', waitForAsync(() => {
    fixture.detectChanges();

    component.searchControl.setValue('New');
    setTimeout(() => {
      fixture.detectChanges();

      const suggestions = fixture.nativeElement.querySelectorAll('.suggestions-list li');
      expect(suggestions.length).toBe(3);
      expect(suggestions[0].textContent).toContain('New York');
      expect(suggestions[1].textContent).toContain('Los Angeles');
      expect(suggestions[2].textContent).toContain('Chicago');

      const req = httpTestingController.expectOne('http://localhost:3000/api/text?page=1&pageSize=100&search=New');
      expect(req.request.method).toEqual('GET');
      req.flush(['New York', 'Los Angeles', 'Chicago']);
    }, 300);
  }));

  it('should call selectSuggestion on suggestion click', waitForAsync(() => {
    fixture.detectChanges();

    jest.spyOn(component, 'selectSuggestion');
    component.searchControl.setValue('New');
    setTimeout(() => {
      fixture.detectChanges();

      const suggestion = fixture.nativeElement.querySelector('.suggestions-list li');
      suggestion.click();

      expect(component.selectSuggestion).toHaveBeenCalledWith('New York');


      const req = httpTestingController.expectOne('http://localhost:3000/api/text?page=1&pageSize=100&search=New');
      expect(req.request.method).toEqual('GET');
      req.flush(['New York', 'Los Angeles', 'Chicago']);
    }, 300);
  }));

  it('should update search control value on suggestion click', waitForAsync(() => {
    fixture.detectChanges();

    component.searchControl.setValue('New');
    setTimeout(() => {
      fixture.detectChanges();

      const suggestion = fixture.nativeElement.querySelector('.suggestions-list li');
      suggestion.click();
      fixture.detectChanges();

      expect(component.searchControl.value).toBe('New York');

      const req = httpTestingController.expectOne('http://localhost:3000/api/text?page=1&pageSize=100&search=New');
      expect(req.request.method).toEqual('GET');
      req.flush(['New York', 'Los Angeles', 'Chicago']);
    }, 300);
  }));
});
