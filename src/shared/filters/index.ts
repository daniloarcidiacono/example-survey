import {VueConstructor} from 'vue';
import optionalFilter from '@/shared/filters/Optional';
import roundFilter from '@/shared/filters/Round';
import isoDateTimeFilter from '@/shared/filters/ISODateTime';

export default {
    install(Vue: VueConstructor) {
        Vue.filter('optional', optionalFilter);
        Vue.filter('round', roundFilter);
        Vue.filter('isodatetime', isoDateTimeFilter);
    }
}
