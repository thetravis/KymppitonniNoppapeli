import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiikkaComponent } from './miikka.component';

describe('MiikkaComponent', () => {
  let component: MiikkaComponent;
  let fixture: ComponentFixture<MiikkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiikkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiikkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
