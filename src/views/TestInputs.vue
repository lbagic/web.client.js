<template>
  <div class="test-wrapper">
    <!-- date -->
    <p>input-date</p>
    <snt-input type="date" required label="input-date" @blur="$log" />
    <!-- time -->
    <p>input-time</p>
    <snt-input type="time" :is24="false" @blur="$log" />
    <!-- month -->
    <p>input-month</p>
    <snt-input type="month" @blur="$log" />
    <!-- text -->
    <p>input-text</p>
    <snt-input
      type="text"
      :options="[
        { value: 1, label: 'aaa' },
        { value: 22222222222222, label: 'bbb' },
      ]"
      required
      label="Que?"
      placeholder="Things"
      help="I am here to help"
      @blur="$log"
    />
    <!-- email -->
    <p>input-email</p>
    <snt-input
      v-model="mojemail"
      type="email"
      required
      label="Enter email"
      placeholder="WEMAIL"
    />
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
import SntInput from "../components/utils/SntInput.vue";

export default {
  components: { SntInput },
  name: "TestInputs",
  mounted() {},
  data() {
    return { mojemail: "", val: "" };
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
