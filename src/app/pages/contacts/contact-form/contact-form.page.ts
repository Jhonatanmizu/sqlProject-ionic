import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Contact } from 'src/app/shared/contact';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.page.html',
  styleUrls: ['./contact-form.page.scss'],
})
export class ContactFormPage implements OnInit, AfterViewInit {
  contactForm: FormGroup
  contact: Contact
  constructor(private fb: FormBuilder, private contactService: ContactService, private route: ActivatedRoute, private toastController: ToastController) { }
  title: string = "Novo contato"
  ngOnInit() {
    this.createForm();
    this.contact = new Contact()
    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.title = "Editando contato"
      this.loadContact(parseInt(idParam))
    }
  }
  ngAfterViewInit() {
    // this.completeForm()
  }

  createForm() {
    this.contactForm = this.fb.group({
      id: [null, Validators.nullValidator],
      name: ["", Validators.required]
    })
  }
  async onSubmit() {
    try {

      const result = this.contactService.saveContact(this.contactForm.value)
      //  this.contact.id = result.insertId;
      const toast = this.toastController.create({
        header: "Sucesso",
        message: "Contato salvo com sucesso",
        animated: true,
        color: "success",
        position: "bottom",
        duration: 3000

      });
      (await toast).present()
    } catch (error) {
      const toast = this.toastController.create({
        header: "Erro",
        message: "Ocorreu um erro",
        animated: true,
        color: "warning",
        position: "bottom",
        duration: 3000

      });
      (await toast).present()

    }
  }


  async loadContact(id: number) {
    this.contact = await this.contactService.getById(id)
  }
  completeForm(data: Contact) {
    this.contactForm.patchValue({
      id: data.id,
      name: data.name
    })
  }
}
