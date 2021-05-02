import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = [];

  storageListenSub: Subscription;

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if(event.key === 'notes')
          this.loadState();
    })
  }

  ngOnDestroy() {
    if(this.storageListenSub)
      this.storageListenSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    var note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    var noteIndex = this.notes.findIndex(n => n.id === id);
    if(noteIndex != -1) {
      this.notes.splice(noteIndex, 1);
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      var notesInStorage = JSON.parse(localStorage.getItem('notes'));
      this.notes.length = 0;
      this.notes.push(...notesInStorage);

    } catch (error) {
      console.log('There was an error retrieving the notes from localStorage');
      console.log(error);
    }
  }
}
