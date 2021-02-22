import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShortComponent } from './short.component';

describe('ShortComponent', () => {
  let component: ShortComponent;
  let fixture: ComponentFixture<ShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
