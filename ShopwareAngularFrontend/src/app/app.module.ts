import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppService} from './services/app.service';
import {HttpClientModule} from '@angular/common/http';
import {HomeService} from './services/home.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        AppService,
        HomeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
