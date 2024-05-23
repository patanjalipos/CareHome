import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription, interval, switchMap } from 'rxjs';
import { MasterService } from './master.service';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private alertSubscription: Subscription;
    private fetchInterval = 60000; // Fetch every 60 seconds

    constructor(
        private masterService:MasterService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.alertSubscription = interval(this.fetchInterval)
            .pipe(switchMap(() => this.masterService.GetVitalAlertsByStatus())) //Call Fetch Alert API
            .subscribe(
                (alerts) => {
                    alerts.forEach((alert) => {
                        this.showNotification(alert.message);
                    });
                },
                (error) => {
                    console.error('Error fetching alerts', error);
                }
            );

        // Initial fetch to show notifications immediately on load
        this.masterService.GetVitalAlertsByStatus().subscribe(
            (alerts) => {
                alerts.forEach((alert) => {
                    this.showNotification(alert.message);
                });
            },
            (error) => {
                console.error('Error fetching alerts', error);
            }
        );
    }

    ngOnDestroy() {
        if (this.alertSubscription) {
            this.alertSubscription.unsubscribe();
        }
    }

    showNotification(message: string) {
        this.messageService.add({
            severity: 'info',
            summary: 'Notification',
            detail: message,
            life: 5000,
        });
    }
}
