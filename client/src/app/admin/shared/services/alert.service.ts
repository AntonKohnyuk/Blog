import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ALERT_TYPE } from '../enums/alert.enum';

interface Alert {
  type: ALERT_TYPE;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$: Subject<Alert> = new Subject<Alert>();

  constructor() {}

  success(text: string) {
    this.alert$.next({ type: ALERT_TYPE.SUCCESS, text });
  }
  warning(text: string) {
    this.alert$.next({ type: ALERT_TYPE.WARNING, text });
  }
  error(text: string) {
    this.alert$.next({ type: ALERT_TYPE.ERROR, text });
  }
}
