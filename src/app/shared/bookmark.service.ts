import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = [];

  storageListenSub: Subscription;

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if(event.key === 'bookmarks')
          this.loadState();
    })
  }

  ngOnDestroy() {
    if(this.storageListenSub)
      this.storageListenSub.unsubscribe();
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    var bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);
    this.saveState();
  }

  deleteBookmark(id: string) {
    var bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if(bookmarkIndex != -1) {
      this.bookmarks.splice(bookmarkIndex, 1);
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      var bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks'), (key, value) => {
        if(key == 'url') return new URL(value);
        return value;
      });
      this.bookmarks.length = 0;
      this.bookmarks.push(...bookmarksInStorage);

    } catch (error) {
      console.log('There was an error retrieving the bookmarks from localStorage');
      console.log(error);
    }
  }
}
