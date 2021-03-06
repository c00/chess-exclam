import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { GameListComponent } from './game-list/game-list.component';
import { LevelModalComponent } from './level-modal/level-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LevelItemComponent } from './level-item/level-item.component';
import { AboutComponent } from './about/about.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InstructionsModalComponent } from './instructions-modal/instructions-modal.component';
import { SheetComponent } from './sheet/sheet.component';
import { SheetService } from './sheet.service';
import { SoundComponent } from './sound/sound.component';
import { ResultIndicatorComponent } from './result-indicator/result-indicator.component';
import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';
import { CongratContentComponent } from './congrat-content/congrat-content.component';

const initializer = (sheets: SheetService) => () => sheets.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NavbarComponent,
    GameListComponent,
    LevelModalComponent,
    LevelItemComponent,
    AboutComponent,
    InstructionsModalComponent,
    SheetComponent,
    SoundComponent,
    ResultIndicatorComponent,
    CongratsDialogComponent,
    CongratContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [SheetService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
