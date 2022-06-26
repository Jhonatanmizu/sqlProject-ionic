import { Component } from '@angular/core';
import { StatusBarPlugin } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dbService: DatabaseService, private platform: Platform) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.setStyle('default')
      // this.splashScreen.hide();
      console.log("INICIADO");
      // this.dbService.createDB();
      this.dbService.openDB()


      let name = 'testing'
      console.log(name)

    })
  }
}
