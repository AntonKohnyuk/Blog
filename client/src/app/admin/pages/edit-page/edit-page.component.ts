import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { switchMap, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EditPageComponent implements OnInit, OnDestroy {
  public post!: Post;
  public isEdit: boolean = false;
  public submitted: boolean = false;
  public editForm!: FormGroup;

  private postsServiceSubU!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.editForm = this.fb.group({
          title: [
            this.post.title,
            [Validators.required, Validators.maxLength(40)],
          ],
          text: [this.post.text, Validators.required],
        });
      });
  }

  ngOnDestroy(): void {
    if (this.postsServiceSubU) this.postsServiceSubU.unsubscribe();
  }

  submit() {
    if (this.editForm.invalid) return;

    this.submitted = true;
    let updatedPost = {
      ...this.post,
      title: this.editForm.value.title,
      text: this.editForm.value.text,
    };
    this.postsServiceSubU = this.postsService
      .update(updatedPost)
      .subscribe(() => {
        this.post = updatedPost;
        this.submitted = false;
        this.isEdit = !this.isEdit;
        this.alert.success('Post has been update!');
      });
  }

  changeEdit() {
    this.editForm.reset({ title: this.post.title, text: this.post.text });
    this.isEdit = !this.isEdit;
  }
}
