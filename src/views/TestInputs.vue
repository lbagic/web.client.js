<template>
  <div class="test-wrapper">
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
      :validator="(val) => (val === '' ? 'KHM, REQUIRED!' : true)"
      error="Whaaat?"
      placeholder="Things"
      help="I am here to help"
    />
    <!-- email -->
    <p>input-email</p>
    <snt-input
      type="email"
      value="qweqwe"
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
    <snt-input type="number" />
    <!-- tel -->
    <p>input-tel</p>
    <snt-input type="tel" />
    <!-- color -->
    <p>input-color</p>
    <snt-input type="color" />
    <!-- url -->
    <p>input-url</p>
    <snt-input type="url" />
    <!-- checkbox -->
    <p>input-checkbox</p>
    <snt-input type="checkbox" labelPosition="inline end">
      <template #label>
        <p>Im a <a href="/" class="snt-animate-underline">LINK</a></p>
      </template>
    </snt-input>
    <!-- radio -->
    <p>input-radio</p>
    <snt-input type="radio" label="Im radio label">
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
    <snt-input type="file" />
    <!-- textarea -->
    <p>textarea</p>
    <textarea id="" name="" cols="30" rows="5"></textarea>
    <snt-input type="textarea" />
    <!-- select -->
    <p>select</p>
    <select id="" name="">
      <option>Asdf</option>
      <option>Qwe</option>
      <option>Rty</option>
    </select>
    <snt-input
      type="select"
      optionsLabelPath="value"
      optionsValuePath="id"
      :options="[
        { id: 1, value: 'New York' },
        { id: 2, value: 'Vivaldi' },
        { id: 3, value: 'Antoa' },
        { id: 4, value: 'Bruxelles' },
      ]"
    />
    <!-- date -->
    <!-- <p>input-date</p>
    <snt-input v-model="val" type="date" required label="qwe" />
    <p>value: {{ val }}</p> -->
    <!-- time -->
    <!-- <p>input-time</p>
    <snt-input type="time" /> -->
  </div>
</template>

<script>
import SntInput from "../components/utils/SntInput.vue";

export default {
  components: { SntInput },
  name: "TestInputs",
  mounted() {},
  data() {
    return { val: "" };
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
