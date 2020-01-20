import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrls: ['./request-manager.component.css']
})
export class RequestManagerComponent implements OnInit {
  RequestInformation: String;
  form: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      requestAccepted:['',Validators.required],
      feedback:[''],
    });//TODO will need to check
  }

  requestButtonClick() {
    this.submitted = true;
    //TODO will need to now get which radio button is selected and updated accepted.
    //Check information is invalid, if so display errors and stop
    if (this.form.invalid) {
      return;
    } else {
      alert("TODO implementation");
    }
  }

}
