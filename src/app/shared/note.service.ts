import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [
    new Note('Test title', 'Test content'),
    new Note('Test title 2', 'Test content 2')
  ];

  constructor() { }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    var note = this.getNote(id);
    Object.assign(note, updatedFields);
  }

  deleteNote(id: string) {
    var noteIndex = this.notes.findIndex(n => n.id === id);
    if(noteIndex != -1) {
      this.notes.splice(noteIndex, 1);
    }
  }
}
