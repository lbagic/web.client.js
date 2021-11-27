<template>
  <div class="test-wrapper">
    <!-- date -->
    <p>input-date</p>
    <snt-input
      v-model="dateModel"
      type="date"
      :datetimeOptions="{ locale: 'hr' }"
      required
    />
    <p>{{ dateModel }}</p>
    <p>input-date2</p>
    <snt-input v-model="dateModel2" type="date" required />
    <p>{{ dateModel2 }}</p>
    <!-- time -->
    <p>input-time</p>
    <snt-input type="time" required />
    <!-- month -->
    <p>input-month</p>
    <snt-input type="month" required />
    <!-- text -->
    <!-- <p>input-text</p> -->
    <p>random text input</p>
    <snt-input
      type="text"
      :options="[
        { value: 1, label: 'aaa' },
        { value: 2, label: 'bbb' },
      ]"
      required
      placeholder="Things"
      help="I am here to help"
    />
    <snt-input
      type="text"
      :options="[
        { value: 1, label: 'aaa' },
        { value: 2, label: 'bbb' },
      ]"
      required
      placeholder="Things"
      help="I am here to help"
    />
    <!-- email -->
    <p>input-email</p>
    <snt-input type="email" required label="Enter email" placeholder="WEMAIL" />
    <!-- password -->
    <p>input-password</p>
    <snt-input type="password" />
    <!-- search -->
    <p>input-search</p>
    <snt-input type="search" required />
    <!-- number -->
    <p>input-number</p>
    <snt-input required type="number" />
    <!-- tel -->
    <p>input-tel</p>
    <snt-input required type="tel" />
    <!-- color -->
    <p>input-color</p>
    <snt-input required type="color" />
    <!-- url -->
    <p>input-url</p>
    <snt-input required type="url" />
    <!-- checkbox -->
    <p>input-checkbox</p>
    <snt-input type="checkbox" labelPosition="inline end" required>
      <template #label>
        <p>Im a <a href="/" class="snt-animate-underline">LINK</a></p>
      </template>
    </snt-input>
    <!-- radio -->
    <p>input-radio</p>
    <snt-input type="radio" label="Im radio label" required>
      <!-- <template #label>
        <p>
          Radio input <a href="/" class="snt-animate-underline">link to go</a>
        </p>
      </template> -->
    </snt-input>
    <!-- range -->
    <p>input-range</p>
    <snt-input type="range" />
    <!-- file -->
    <p>input-file</p>
    <snt-input type="file" required />
    <!-- textarea -->
    <p>textarea</p>
    <snt-input type="textarea" required />
    <!-- select -->
    <p>select</p>
    <snt-input
      type="select"
      optionsLabelPath="value"
      optionsValuePath="id"
      required
      :options="[
        { id: 1, value: 'New York' },
        { id: 2, value: 'Vivaldi' },
        { id: 3, value: 'Antoa' },
        { id: 4, value: 'Bruxelles' },
      ]"
    />
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";
import { formatDate } from "../../utils/datetime.js";

export default {
  components: { SntInput },
  name: "TestInputs",
  mounted() {},
  data() {
    return { dateModel: "", dateModel2: "" };
  },
  methods: {
    dateFormatter(date) {
      const fmt = formatDate(date, { locale: "hr" });
      return `${fmt.dayLong}, ${fmt.month}`;
    },
  },
};
</script>

<style scoped lang="scss">
.test-wrapper {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}
</style>
