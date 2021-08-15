import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";

import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe('Hero Service', () => {
  let mockMsgServ;
  let httpTestingCont: HttpTestingController;
  let heroServ: HeroService;

  beforeEach(() => {
    mockMsgServ = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMsgServ }
      ]
    });

    // httpTestingCont = TestBed.inject(HttpClientTestingModule); // if angular version is 9 and up
    httpTestingCont = TestBed.get(HttpClientTestingModule); // if angular version is 8 and below
    heroServ = TestBed.get(HeroService);
  });

  describe('getHero', () => {

    it('Should call get with the correct URL', inject(
      [HeroService, HttpTestingController],
      (heroServ: HeroService, httpTestingCont: HttpTestingController) => {
        // call getHero()
        heroServ.getHero(3).subscribe();
        // heroServ.getHero(3).subscribe(hero => {
        //   expect(hero.id).toBe(3);
        // });

        // test the url was correct
        const req = httpTestingCont.expectOne('api/heroes/3');
        req.flush({ id: 3, name: 'new super hero', strength: 100 });
        expect(req.request.method).toBe('GET');
        httpTestingCont.verify();
      }
    ));

    // it('Should call get with the correct URL - second way', () => {
    //   // call getHero()
    //   heroServ.getHero(3).subscribe();

    //   // test the url was correct
    //   const req = httpTestingCont.expectOne('api/heroes/4');
    //   req.flush({ id: 4, name: 'new super hero', strength: 100 });
    // });

  });

});
