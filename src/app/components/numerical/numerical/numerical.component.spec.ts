import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumericalComponent } from './numerical.component';

describe('NumericalComponent', () => {
  let component: NumericalComponent;
  let fixture: ComponentFixture<NumericalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumericalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
