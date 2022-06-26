import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Contact } from 'src/app/core/models/contact';
import { ContactService } from 'src/app/shared/contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService, private toastController: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    // let contact: Contact = {
    //   id: this.contacts.length > 0 ? this.contacts.length : 1,
    //   name: 'Josh',
    //   number: '46545645',
    //   email: '64465465'
    // }
    // this.contacts.push(contact)
  }
  // ngAfterViewInit(): void {
  //   this.loadContats()
  // }
  ionViewWillEnter() {

    this.loadContats()
  }
  async loadContats() {
    this.contacts = await this.contactService.getAll()
  }
  async onSearchChange(event: any) {
    const value = event.target.value
    if (value && value.length >= 2) {
      this.contacts = await this.contactService.filter(value)
    }
  }
  clearSearch() {
    this.loadContats()
  }
  async deleteContact(contact: Contact) {
    const alert = await this.toastController.create({
      header: "Deletar?",
      message: `Deseja excluir o contato ${contact.name}`,
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel'
        },
        {
          text: "Excluir",
          handler: () => {
            this.executeDelete(contact)
          }
        }
      ]
    })
  }
  async executeDelete(contact: Contact) {
    try {
      await this.contactService.delete(contact)
      // this.contacts = this.contacts.filter((c:Contact) => contact.id  != c.id)
      const index = this.contacts.indexOf(contact)
      this.contacts.splice(index, 1)

      const toast = this.toastController.create({
        header: " Sucesso",
        message: "deletado com sucesso",
        color: "success",
        animated: true,
        position: "bottom",
        duration: 3000
      })
        ; (await toast).present()
    } catch (error) {
      const toast = this.toastController.create({
        header: " Erro",
        message: "ocorreu um erro",
        color: "warning",
        animated: true,
        position: "bottom",
        duration: 3000
      })
        ; (await toast).present()
    }
  }
}
