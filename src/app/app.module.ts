/** Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
/** Components */
import { AppComponent } from './app.component';

/** Reducers */
import { CustomerReducer } from './store/reducers/customer.reducer';

/** Effects */
import { CustomerEffects } from './store/effects/customer.effects';

/** Services */
import { CustomerService } from './shared/services/customer.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ customers: CustomerReducer }),
    EffectsModule.forRoot([CustomerEffects])
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
