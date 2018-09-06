import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(keyword: string): void {
    this.searchTerms.next(keyword);
  }

  
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // 延时300毫秒以防止频繁请求
      debounceTime(300),
 
      // 舍弃那些参数没有变化的请求
      distinctUntilChanged(),

      // 按请求时间保留最后一次的请求结果
      switchMap((keyword: string) => this.heroService.searchHeroes(keyword)),
    );
  }

}
