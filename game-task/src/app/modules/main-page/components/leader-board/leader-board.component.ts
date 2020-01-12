import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  @Input() leaderList: any;

  constructor() { }

  ngOnInit() {
  }

}
