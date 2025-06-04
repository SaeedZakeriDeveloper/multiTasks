import { Component, DoCheck, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { IContact } from 'src/app/tasks/task3/interfaces/IContact';
import { ContactService } from 'src/app/tasks/task3/services/contact.service';

@Component({
  selector: 'app-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.css']
})
export class SimpleCrudComponent implements OnInit {

  contacts: IContact[] = []
  email: any
  showEmailForEdit: boolean = false
  emailIdforEdit: number = 0
  newEmailForAdd: string | undefined


  addNewUserFrom: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required)
  })

  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.contactService.getAllUsers().subscribe((res) => {
      this.contacts = res
      console.log(res)
    })



  }


  //VASE por kardan form 
  onEditButtonClicked(contact: IContact) {
    this.emailIdforEdit = contact.id
    this.showEmailForEdit = true
    this.email = contact.email
  }



  //baraye save 
  onSaveClicked() {
    let contact = this.contacts.find(x => x.id === this.emailIdforEdit)
    if (contact) {
      contact.email = this.email
      this.contactService.upDate(contact).subscribe((res) => {
        contact = res
        this.showEmailForEdit = false
      })
    }
  }




  onDeleteButtonClicked(id: number) {
    this.contactService.remove(id).subscribe((res) => {
      let index = this.contacts.findIndex(x => x.id == id)
      if (index != -1) {
        this.contacts.splice(index, 1)
      }
    })

  }

  onSubmit() {
    let newContact: IContact = {
      id: 0, email: "", body: "", name: ""
    }
    newContact.email = this.addNewUserFrom.value.email
    newContact.body = this.addNewUserFrom.value.body
    newContact.name = this.addNewUserFrom.value.name
    

    this.contactService.add(newContact).subscribe((res) => {
      // this.contacts.push(res)

     this.contacts.splice(0 , 0 , res)
    })
  }




}