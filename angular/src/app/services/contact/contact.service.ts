import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // declaring mock data for contact list
  contacts: Contact[] = [
    {
      id: 'ac24ed8f-40fd-48fe-9369-3133afb56027',
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@msn.com',
      country: 'Albania'
    },
    {
      id: '7fd3cbdd-bd47-4194-950c-ee78879454d4',
      firstName: 'Terry',
      lastName: 'Smith',
      email: 'terrysmith@msn.com',
      country: 'Austria'
    }
  ]

  constructor() { }

  //function to get all contacts from mock data variable cotanct returned as Observable array of Contacts
  getAllContacts(): Observable<Contact[]>{
    // returning array of contact objects as observable with rxjs of operator 
    return of(this.contacts);
  }

  //function to get single contact from array based on id
  getContactById(id: string): Contact{
    return this.contacts.find((contact: Contact) => contact.id == id);
  }

  //function to create a new contact by pushing new contact object in contacts array
  createContact(contact: Contact): void{
    this.contacts.push(contact);
  }

  //function to edit contact array item based on id
  editContact(contact: Contact): void{
    const index = this.contacts.findIndex(obj => obj.id == contact.id);
    this.contacts[index] = contact;
  }

  deleteContact(id: string): void{
    const index = this.contacts.findIndex(obj => obj.id == id);
    this.contacts.splice(index, 1);
  }
}
