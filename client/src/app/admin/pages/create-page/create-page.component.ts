import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  public createForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40)]],
      text: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  submit() {
    if (this.createForm.invalid) {
      return;
    }

    const post: Post = {
      title: this.createForm.value.title,
      text: this.createForm.value.text,
      author: this.createForm.value.author,
      date: new Date(),
    };

    console.log(post);
  }
}
