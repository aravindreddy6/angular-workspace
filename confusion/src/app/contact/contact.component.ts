import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: string;
  feedbackcopy: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be atleast 2 charecters long',
      'maxlength': 'First name cannot be more than 25 charecters long'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be atleast 2 charecters long',
      'maxlength': 'Last name cannot be more than 25 charecters long'
    },
    'telnum': {
      'required': 'Tel. number name is required.',
      'pattern': 'tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email name is required',
      'email': 'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private location: Location,
    private route: ActivatedRoute,
    @Inject('BaseURL') private BaseURL) {
   }

  ngOnInit() {
    this.createForm();
  }

  
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
     .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?:any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    //this.feedbackcopy.push(this.feedback);
    this.feedbackService.putFeedback(this.feedbackcopy)
     .subscribe(feedback => {
       this.feedback = feedback;this.feedbackcopy=feedback;
     },
     ),
       errmess => { this.feedback = null;this.feedbackcopy=null;this.errMess = <any>errmess; }
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}