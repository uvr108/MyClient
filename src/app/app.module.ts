import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';

import { CrudService } from './shared/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule} from '@angular/cdk/table';
import { TreeComponent } from './components/tree/tree.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddIssueComponent,
    EditIssueComponent,
    IssueListComponent,
    TreeComponent,
    TopBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CdkTableModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
