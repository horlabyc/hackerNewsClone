import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule , HttpLink} from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsPageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://www.graphqlhub.com/graphql?pretty=true'}),
      cache:  new InMemoryCache()
    })
  }
}
