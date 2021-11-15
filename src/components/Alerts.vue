<style lang="scss">
    .Alert {
        &__Content {
        }

        &__ContentIcon {
            margin-right: 0.5em;
        }
    }
</style>

<template>
    <v-snackbar v-if="alert"
                class="Alert"
                :value="true"
                :timeout="2000"
                :color="alert.color">
        <div class="Alert__Content">
            <v-icon v-if="alert.icon" class="Alert__ContentIcon">{{ alert.icon }}</v-icon>
            {{ alert.text }}
        </div>

        <v-btn
            color="white"
            text
            @click="dismissAlert(index)">
            Dismiss
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {EventBus} from '@/shared/EventBus';

export interface Alert {
    text: string;
    icon?: string;
    color: string;
    timerId?: number;
}

@Component
export default class Alerts extends Vue {
    public alert: Alert | null = null;

    public constructor() {
        super();
        EventBus.$on('alert', this.addAlert.bind(this));
    }

    public addAlert(alert: Alert) {
        this.dismissAlert();
        this.alert = alert;
        this.alert.timerId = setTimeout(this.dismissAlert.bind(this), 2000);
    }

    public dismissAlert() {
        if (this.alert != null) {
            clearTimeout(this.alert.timerId);
            this.alert = null;
        }
    }
}
</script>
