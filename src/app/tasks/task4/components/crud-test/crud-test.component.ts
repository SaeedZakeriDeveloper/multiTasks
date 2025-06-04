import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { IContact } from 'src/app/tasks/task3/interfaces/IContact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-crud-test',
  templateUrl: './crud-test.component.html',
  styleUrls: ['./crud-test.component.css']
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

  addEditUserForm = new FormGroup({
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
    this.addEditUserForm.reset()

  }

  onSubmit() {

    this.contact.name = this.addEditUserForm?.value?.name || ''
    this.contact.email = this.addEditUserForm?.value?.email || ''
    this.contact.body = this.addEditUserForm?.value?.body || ''
   
    
    if (this.isEditMode) {
      this.crudService.upDate(this.contact).subscribe((res) => {
        const index = this.contacts.findIndex(x => x.id === this.contact.id);
            
      })
    }
    else {
      this.crudService.add(this.contact).subscribe((res) => {
        this.contacts.push(this.contact)
        this.isFormVisible = false
        this.addEditUserForm.reset()
      })
    }



  }

  onDeleteButtonClicked(id: number) {
    this.crudService.remove(id).subscribe((res) => {
      let index = this.contacts.findIndex(x => x.id == id)
      if (index != -1) {
        this.contacts.splice(index, 1)
      }
    })
  }


  onEditButtonClicked(id: number) {
    this.isFormVisible = true
    this.isEditMode = true
    const editContact = this.contacts.find(x => x.id == id)
    if (editContact) {
      this.addEditUserForm.patchValue({
        name: editContact.name,
        email: editContact.email,
        body: editContact.body
      })
    }




  }















}
