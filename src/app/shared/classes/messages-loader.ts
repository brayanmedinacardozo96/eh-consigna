import { MessageService } from './../services/message.service';
import { environment } from 'src/environments/environment';

export function MessagesLoader(messageService: MessageService) {
    // Note: this factory need to return a function (that return a promise)
    return () => messageService.load(`${environment.messagesFile}`);
}