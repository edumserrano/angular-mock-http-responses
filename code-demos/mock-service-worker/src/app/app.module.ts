import { ENVIRONMENT_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: async () => {
        if (!isDevMode()) {
          return;
        }

        const { worker } = await import('../mock-api-responses/browser');
        await worker.start();
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
