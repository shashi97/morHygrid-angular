import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageModel } from './messageService.model'
import { MessageService } from './messageService.service'
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-message',
    templateUrl: 'messageService.component.html',
    styleUrls: ['messageService.component.css']
})
export class MessageSericeComponent implements OnInit, OnDestroy {
    show = false;
    msgs: Message[] = [];

    private subscription: Subscription;
    messageDetail: MessageModel = new MessageModel();
    constructor(
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.msgs = [];
        this.subscription = this.messageService.loaderState
            .subscribe((state: MessageModel) => {
                this.messageDetail = state;
                this.show = true;
                this.msgs.push(this.messageDetail);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
