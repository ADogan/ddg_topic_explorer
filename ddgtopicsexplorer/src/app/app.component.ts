import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ddgtopicsexplorer';

  profileForm: FormGroup;
  currentSearch: string;

  ngOnInit() {
    const firstInput = new FormControl();

    this.profileForm = new FormGroup({
      firstInput: firstInput
    });

  }

  saveSearch() {
    this.currentSearch = this.profileForm.controls.firstInput.value;
  }
}
