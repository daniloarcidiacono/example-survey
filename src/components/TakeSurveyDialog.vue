<style lang="scss">
    .TakeSurveyDialog {
    }
</style>

<template>
    <v-dialog v-model="opened"
              max-width="1024px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ title }}</span>
            </v-card-title>

            <v-form v-model="valid">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                Please fill in user details:
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                <v-text-field v-model="user.name" label="Name*" required autofocus :rules="nameRules" />
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                <v-text-field v-model="user.surname" label="Surname*" required :rules="surnameRules" />
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                <v-text-field v-model="user.age" label="Age*" type="number" required :rules="ageRules" />
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                <v-text-field v-model="user.email" label="Email" :rules="emailRules" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <h5>Fields marked with * are required.</h5>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-form>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1"
                       text
                       :disabled="saving"
                       @click="close">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1"
                       :loading="saving"
                       text
                       @click="save">
                    Start survey
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {EventBus} from '@/shared/EventBus';
    import {Survey} from '@/shared/api/survey/dto/Survey';
import {User} from '@/shared/api/survey/dto/User';
import {surveyApi} from "@/shared/api/APIExports";
import {SurveyError} from "@/shared/api/survey/dto/SurveyError";
import {alertService, AlertService} from "@/shared/services/AlertService";

@Component
export default class TakeSurveyDialog extends Vue {
    public survey: Survey | null = null;
    public valid: boolean = false;
    public opened: boolean = false;
    public saving: boolean = false;
    public user: User = {
        name: "",
        surname: "",
        age: 18,
        email: null
    };

    public nameRules: any[] = [
        (v: number) => !!v || 'Name is required'
    ];

    public surnameRules: any[] = [
        (v: number) => !!v || 'Surname is required'
    ];

    public ageRules: any[] = [
        (v: number) => !!v || 'Age is required',
        (v: number) => v >= 18 || 'Must be 18 or older',
    ];

    public emailRules: any[] = [
        (v: string) => !v || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(v) || 'E-mail must be valid',
    ];

    public beforeMount(): void {
        this.user.name = localStorage.getItem("dialog.user.name") || "";
        this.user.surname = localStorage.getItem("dialog.user.surname") || "";
        this.user.age = parseInt(localStorage.getItem("dialog.user.age") || "18");
        this.user.email = localStorage.getItem("dialog.user.email") || null;
    }

    public open(survey: Survey) {
        this.survey = survey;
        this.opened = true;
    }

    public save() {
        this.saving = true;
        localStorage.setItem("dialog.user.name", this.user.name);
        localStorage.setItem("dialog.user.surname", this.user.surname);
        localStorage.setItem("dialog.user.age", `${this.user.age}`);
        if (this.user.email !== null) {
            localStorage.setItem("dialog.user.email", this.user.email);
        } else {
            localStorage.removeItem("dialog.user.email");
        }

        surveyApi.takeSurvey(this.survey!.id, this.user).then((takeId: string) => {
            this.$emit('save', { survey: this.survey, takeId });
            this.close();
        }).catch((error: SurveyError) => {
            alertService.error(`Could not take survey: ${error.message}`);
        }).finally(() => {
            this.saving = false;
        });
    }

    public close() {
        this.opened = false;
        this.saving = false;
        this.survey = null;
    }

    public get title(): string {
        return !!this.survey ? `Start "${this.survey.name}"` : "";
    }
}
</script>
