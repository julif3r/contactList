import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  // declaring observable contacts variable
  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts$ = this.getAllContact();
  }

  //function to get contacts data from contact service
  getAllContact() {
    return this.contactService.getAllContacts();
  }

  //function to delete single contact from id
  deleteContact(id: string) {
    if(window.confirm('Are you sure')){
      const result = this.contactService.deleteContact(id);
    }
  }

}
