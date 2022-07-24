import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { IonicTestingIssueComponent } from "./ionic-testing-issue/ionic-testing-issue.component";
import { PerformanceIssueComponent } from "./performance-issue/performance-issue.component";
import { TreeComponent } from "./performance-issue/tree.component";

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    PerformanceIssueComponent,
    IonicTestingIssueComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    IonicModule.forRoot(),
    //FakeIonicModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
