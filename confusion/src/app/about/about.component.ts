import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { ActivatedRoute } from '@angular/router';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders:Leader[];

  constructor(private leaderService:LeaderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.leaders=this.leaderService.getLeaders();

  }

}
