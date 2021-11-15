<style lang="scss">
  .Tips {
      width: 100%;
      height: 100%;
      padding: 1em 15%;
      overflow-x: hidden;
      overflow-y: auto;

      &__Title {
          margin-bottom: 0.5em;
      }

      &__Code {
          &--inline {
              display: inline;
          }

          &--block {
              margin-top: 1em;
              border: 1px solid gainsboro;
              padding: 1em;
          }
      }
  }
</style>

<template>
    <div class="Tips">
        <h1 class="Tips__Title text-h3 font-weight-light">Tips</h1>
        <v-alert border="top"
                 colored-border
                 type="info"
                 icon="mdi-leaf"
                 color="#6db33f"
                 elevation="2">
            <ul>
                <li>Use <pre class="Tips__Code--inline">Instant.now().toString()</pre> to generate a ISO-8601 datetime string;</li>
                <li>
                    Use <pre class="Tips__Code--inline">SimpleDateFormat</pre> to check if a date answer is valid:
                    <pre class="Tips__Code--block">
final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
simpleDateFormat.setLenient(false);
try {
    simpleDateFormat.parse(answer.get(0));
} catch (ParseException e) {
    throw new AnswerMismatchException("Invalid date format");
}
                    </pre>
                </li>
                <li>
                    Use a <pre class="Tips__Code--inline">Pattern</pre> to check if an email:
                    <pre class="Tips__Code--block">
public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

public static boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
}
                    </pre>
                </li>
            </ul>
        </v-alert>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Tips extends Vue {
}
</script>
