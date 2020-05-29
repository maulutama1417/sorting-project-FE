import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlatComponent } from './detail-alat.component';

describe('DetailAlatComponent', () => {
  let component: DetailAlatComponent;
  let fixture: ComponentFixture<DetailAlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
