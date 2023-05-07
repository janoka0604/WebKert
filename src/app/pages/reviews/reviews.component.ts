import { Component } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  items?: any[];

  constructor(private commentService: CommentService) {
   }

   ngOnInit() {
    this.commentService.getProducts().subscribe(item => {
      this.items = item;
    });
  }

}
