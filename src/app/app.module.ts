import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { TreeComponent } from "./tree.component";

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
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
