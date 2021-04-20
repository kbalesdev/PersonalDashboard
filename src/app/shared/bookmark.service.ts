import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark("Google", "http://www.google.com"),
    new Bookmark("Wikipedia", "http://www.wikipedia.org"),
    new Bookmark("YouTube", "http://www.youtube.com")
  ];

  constructor() { }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    var bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);
  }

  deleteBookmark(id: string) {
    var bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if(bookmarkIndex != -1) {
      this.bookmarks.splice(bookmarkIndex, 1);
    }
  }
}
