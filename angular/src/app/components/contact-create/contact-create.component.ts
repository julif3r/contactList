import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import * as countryList from 'country-list';
import * as uuid from 'uuid';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {

  //declaring form controls for new contact validation rules
  formGroup: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  country: FormControl;
  email: FormControl;

  contact: Contact;
  //declaring Country List and filling with data from country-list npm library 
  countryList: Country[] = countryList.getData();

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [ Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ] );
    this.country = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      firstNameControl: this.firstName,
      lastNameControl: this.lastName,
      emailControl: this.email,
      countryControl: this.country
    });
  }

  //Creating new contact object from form control values and adding it to contacts array in contact service
  submit(){
    if(this.formGroup.valid){
      const id = uuid.v4();
      
      this.contact = {
        id: id,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        country: this.country.value,
        email: this.email.value
      }

      this.contactService.createContact(this.contact);
      //after adding new contact navigating to contact list
      this.router.navigate(['contact-list']);
    }
  }
}
