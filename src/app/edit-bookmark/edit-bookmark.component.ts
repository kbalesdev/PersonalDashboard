import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.css']
})
export class EditBookmarkComponent implements OnInit {

  bookmark: Bookmark;

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      var bookmarkId = paramMap.get('id');
      this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
    });
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) return;

    var { name, url } = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name: name,
      url: new URL(url)
    });

    this.notificationService.onShow('Bookmark updated!', 2500);
  }

  onDelete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
