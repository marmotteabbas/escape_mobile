import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameselect',
  templateUrl: './gameselect.page.html',
  styleUrls: ['./gameselect.page.scss'],
})
export class GameselectPage implements OnInit {

  list = [{name : "robertt", nb : 2}, {name : "Ivan", nb : 24565}]
  constructor() { }

  ngOnInit() {
  }

}
