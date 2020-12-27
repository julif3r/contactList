import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import * as countryList from 'country-list';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  id: string;

  //declaring form controls for editing the contact
  formGroup: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  country: FormControl;
  email: FormControl;

  contact: Contact;
  //declaring Country List and filling with data from country-list npm library 
  countryList: Country[] = countryList.getData();

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.contact = this.getContactById(this.id);

    //Handling if contact service function coulnd't find any contact with that id
    if(typeof this.contact == 'undefined' ){
      console.log('contact doesnt exist');
      this.router.navigate(['/contact-list']);
    }else{
      this.firstName = new FormControl(this.contact.firstName, Validators.required);
      this.lastName = new FormControl(this.contact.lastName, Validators.required);
      this.email = new FormControl(this.contact.email, [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$') ] );
      this.country = new FormControl(this.contact.country, Validators.required);

      this.formGroup = new FormGroup({
        firstNameControl: this.firstName,
        lastNameControl: this.lastName,
        emailControl: this.email,
        countryControl: this.country
      });
    }

  }

  //Editing contact object values and updating it to contacts array in contact service
  submit(){
    if(this.formGroup.valid){
      this.contact = {
        id: this.id,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        country: this.country.value,
        email: this.email.value
      }

      this.contactService.editContact(this.contact);

      //after editing new contact navigating to contact list
      this.router.navigate(['contact-list']);
    }
  }

  getContactById(id: string) {
    return this.contactService.getContactById(id);
  }

}
