import {Component, Vue} from 'vue-property-decorator';

@Component
export class ConfigService extends Vue {
    private mSurveyEnabled: boolean = false;
    private mSurveyBaseUrl: string = "/api";

    public created() {
        this.mSurveyEnabled = localStorage.getItem('surveyEnabled') === "true";
        this.mSurveyBaseUrl = localStorage.getItem('surveyBaseUrl') || "/api";
    }

    public get surveyEnabled(): boolean {
        return this.mSurveyEnabled;
    }

    public set surveyEnabled(value: boolean)  {
        this.mSurveyEnabled = value;
        localStorage.setItem('surveyEnabled', value ? "true" : "false");
    }

    public get surveyBaseUrl(): string {
        return this.mSurveyBaseUrl;
    }

    public set surveyBaseUrl(value: string) {
        this.mSurveyBaseUrl = value;
        localStorage.setItem('surveyBaseUrl', value);
    }
}

export const configService: ConfigService = new ConfigService();
