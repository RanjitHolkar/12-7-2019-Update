import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private _pusher: any;
  constructor() { 
    this._pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
     
    });
  }

  getPusher() {
    return this._pusher;
  }
}
