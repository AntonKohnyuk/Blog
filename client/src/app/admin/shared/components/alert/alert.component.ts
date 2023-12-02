import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ALERT_TYPE } from '../../enums/alert.enum';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 3000;

  private alertServiceSub!: Subscription;

  public readonly alert_types = ALERT_TYPE;

  public text!: string;
  public type: ALERT_TYPE = ALERT_TYPE.SUCCESS;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertServiceSub = this.alertService.alert$.subscribe((alert) => {
      (this.text = alert.text), (this.type = alert.type);
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.alertServiceSub) this.alertServiceSub.unsubscribe();
  }
}
