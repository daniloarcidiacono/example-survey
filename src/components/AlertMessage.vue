<style scoped lang="scss">
    .AlertMessage {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        /*padding: 1em;*/
        justify-content: center;
        align-items: center;
        overflow: hidden;

        &__Icon {
        }

        &__Content {
            margin-top: 1em;
        }
    }
</style>

<template>
    <div class="AlertMessage">
        <div class="AlertMessage__Icon">
            <v-icon size="128" v-if="icon">
                {{ icon }}
            </v-icon>
        </div>
        <div class="AlertMessage__Content display-2 font-weight-thin">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class AlertMessage extends Vue {
    @Prop()
    public icon!: string;
}
</script>
