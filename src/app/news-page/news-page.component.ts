import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'apollo-link';
import { News } from '../model';
import gql from 'graphql-tag';
import { NewsService } from '../Services/news-service.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  hackerNews: News[];
  isError: boolean;
  isLoading: boolean;
  constructor(private apollo: Apollo, private newsService: NewsService) {
    this.isLoading = true;
    this.isError = false;
  }

  fetchNews() {
    this.apollo.watchQuery<any>({
      query: gql `
      query {
        hn{
          topStories(limit: 30) {
            id title url score by{id} time timeISO descendants
          }
        }
      }
      `
    }).valueChanges.subscribe(news => {
      if (Object.keys(news).length > 0) {
        this.extractResult(news.data.hn.topStories);
      }
    }, err => {
      this.isError = true;
      this.isLoading = false;

    })
  }

  extractResult(data) {
    let news: News[] = [];
    data.forEach(story => {
      news.push ({
        id: story.id,
        title: story.title,
        url: story.url,
        shortUrl: story.url ? story.url.replace(/(^\w+:|^)\/\/(w{3}.)*/, "").split('/')[0] : story.url,
        author: story.by.id,
        timeISO: story.timeISO ? this.newsService.getTimeDifference(story.timeISO) : story.timeISO,
        points: story.score,
        commentCount: story.descendants > 0 ? `${story.descendants} comments` : `discuss`
      })
    });
    this.hackerNews = news;
    this.isLoading = false;
  }

  ngOnInit() {
    this.fetchNews()
  }

}
