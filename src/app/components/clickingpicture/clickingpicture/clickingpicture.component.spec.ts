import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClickingpictureComponent } from './clickingpicture.component';

describe('ClickingpictureComponent', () => {
  let component: ClickingpictureComponent;
  let fixture: ComponentFixture<ClickingpictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickingpictureComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClickingpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
