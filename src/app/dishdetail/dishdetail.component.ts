import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {

    dish : Dish;
    dishIds: string[];  
    prev: string;
    next: string;
    commentForm : FormGroup;
    comment: Comment;

    formErrors = {
      'author':'',
      'comment':''

    };

    validationMessages = {
      'author':{
        'required':'Author Name is required.',
        'minlength':'Author Name must be atleast 2 character long.'
      },
      'comment':{
        'required':'Comment is required.'
      }
      
    };
  constructor(private fb:FormBuilder, private dishService: DishService, private route:ActivatedRoute, private location: Location ) {
    this.createFrom();
   }
  createFrom(){
    this.commentForm = this.fb.group({
      rating : '5',
      comment: ['', [Validators.required] ],
      author: ['',[Validators.required, Validators.minLength(2)]],
      date: 'None'
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data? : any){
    console.log("in value changed");
    if(!this.commentForm){return}
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        ///clear previous errors message
        this.formErrors[field] = ''
      }
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          if(control.errors.hasOwnProperty(key)){
            console.log
            this.formErrors[field]+= messages[key] + ' ';
            console.log(this.formErrors[field]);
          }
        }
      }
    }
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    let date = new Date();
    this.comment.date = date.toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset();
    this.commentForm.get('rating').setValue("5");
  }
  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
  goBack(): void{
      this.location.back();
  }

}
