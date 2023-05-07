import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('Comments').valueChanges();
  }
}
