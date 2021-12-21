import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  
  form: FormGroup;

  isOpen = false;

  constructor(fb: FormBuilder, private authService: AuthService, private postService: PostService) {
    this.form = fb.group({
        title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(1)]),
      content: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  onSubmit(formData: Pick<Post, "title" | "content">): void{
    this.postService
    .createPost(formData, this.authService.userId)
    .pipe(
      first())
      .subscribe(() => {
        this.create.emit(null);
    })
    this.form.reset();
    this.formDirective.resetForm();
  }

}
