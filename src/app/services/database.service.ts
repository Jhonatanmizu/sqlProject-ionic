import { Injectable } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// import { Device } from '@capacitor/core'
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
// const { CapacitorSQLite, Device, Storage } = Plugins;


export class DatabaseService {
  db: SQLiteObject;
  databaseName = 'contacts.db'
  constructor(private http: HttpClient, private alertCtrl: AlertController, private sql: SQLite, private sqlitePorter: SQLitePorter) {

  }

  async openDB() {
    try {
      this.db = await this.sql.create({ name: this.databaseName, location: 'default' })
      await this.createDB();
    } catch (error) {
      console.error("ERRO", error);
      // this.alertCtrl.create({
      //   header: 'Erro',
      //   message: "Error in openDB",
      //   buttons: ['Ok']
      // })

    }
  }

  async createDB() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase)
    return result ? true : false;
  }


  getCreateTable() {
    const sqls = []
    sqls.push('CREATE TABLE IF NOT EXISTS contacts (id integer primary key AUTOINCREMENT, name varchar(100))')
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params)
  }
}
