import {EventBus} from '@/shared/EventBus';
import {Alert} from '@/components/Alerts.vue';

export class AlertService {
    public success(text: string): void {
        EventBus.$emit('alert', {
            text,
            color: 'success',
            icon: 'mdi-check'
        } as Alert);
    }

    public warning(text: string): void {
        EventBus.$emit('alert', {
            text,
            color: 'warning',
            icon: 'mdi-alert-circle-outline'
        } as Alert);
    }

    public error(text: string): void {
        EventBus.$emit('alert', {
            text,
            color: 'error',
            icon: 'mdi-alert-circle-outline'
        } as Alert);
    }
}

export const alertService: AlertService = new AlertService();
