import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

import { Hero } from '../hero'
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService
  ) { }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(()=>this.goBack());
  }

  ngOnInit() {
    this.getHero();
  }

}
