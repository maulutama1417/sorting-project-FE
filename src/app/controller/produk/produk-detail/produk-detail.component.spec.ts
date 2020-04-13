import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukDetailComponent } from './produk-detail.component';

describe('ProdukDetailComponent', () => {
  let component: ProdukDetailComponent;
  let fixture: ComponentFixture<ProdukDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
