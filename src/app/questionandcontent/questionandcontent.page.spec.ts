import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionandcontentPage } from './questionandcontent.page';

describe('QuestionandcontentPage', () => {
  let component: QuestionandcontentPage;
  let fixture: ComponentFixture<QuestionandcontentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionandcontentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionandcontentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
