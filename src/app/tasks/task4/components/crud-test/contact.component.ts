import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/contact.service';
import { IContact } from 'src/app/tasks/task3/interfaces/IContact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class CrudTestComponent implements OnInit {
  constructor(private crudService: CrudService) {
  }


  contacts: IContact[] = []
  isEditable: boolean = false
  isFormVisible: boolean = false
  isEditMode: boolean = false

  contact: IContact = {
    id: 0,
    name: "",
    email: "",
    body: ""
  }

  formGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)

  })

  ngOnInit(): void {
    this.crudService.getAllContacts().subscribe((res) => {
      this.contacts = res
    })

  }
  onAddUserClicked() {

    this.isFormVisible = true
    this.isEditMode = false
    this.formGroup.reset()
    this.contact = {
      id: 0,
      name: "",
      email: "",
      body: ""
    }

  }

  onSubmit() {
    this.contact.name = this.formGroup?.value?.name || ''
    this.contact.email = this.formGroup?.value?.email || ''
    this.contact.body = this.formGroup?.value?.body || ''
    if (this.isEditMode) {
      this.crudService.upDate(this.contact).subscribe((res) => {
        const index = this.contacts.findIndex(x => x.id === this.contact.id);
        if (index != -1) {
          this.contacts[index] = res
        }
        this.isFormVisible = false
        this.formGroup.reset()
      })
    }
    else {
      this.crudService.add(this.contact).subscribe((res) => {
        this.contacts.push(res)
        this.isFormVisible = false
        this.formGroup.reset()
      })
    }
  }

  onDeleteButtonClicked(id: number) {
    this.crudService.remove(id).subscribe((res) => {
      if (res) {
        let index = this.contacts.findIndex(x => x.id == id)
        if (index != -1) {
          this.contacts.splice(index, 1)
        }
      } else {
        alert("not sucess")
      }

    })
  }

  onEditButtonClicked(contact: IContact) {
    this.contact = contact
    this.isFormVisible = true
    this.isEditMode = true

    if (contact) {
      this.formGroup.patchValue({
        name: contact.name,
        email: contact.email,
        body: contact.body
      })
    }
  }















}
