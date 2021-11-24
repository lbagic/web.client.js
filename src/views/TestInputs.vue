<template>
  <div class="test-wrapper">
    <!-- text -->
    <p>input-text</p>
    <input type="text" />
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
    <input type="email" />
    <snt-input
      type="email"
      value="qweqwe"
      label="Enter email"
      placeholder="WEMAIL"
    />
    <!-- password -->
    <p>input-password</p>
    <input type="password" />
    <snt-input type="password" />
    <!-- search -->
    <p>input-search</p>
    <input type="search" />
    <snt-input type="search" required />
    <!-- number -->
    <p>input-number</p>
    <input type="number" />
    <snt-input type="number" />
    <!-- tel -->
    <p>input-tel</p>
    <input type="tel" />
    <snt-input type="tel" />
    <!-- color -->
    <p>input-color</p>
    <input type="color" />
    <snt-input type="color" />
    <!-- url -->
    <p>input-url</p>
    <input type="url" />
    <snt-input type="url" />
    <!-- checkbox -->
    <p>input-checkbox</p>
    <input type="checkbox" />
    <snt-input type="checkbox" labelPosition="inline end">
      <template #label>
        <p>Im a <a href="/" class="snt-animate-underline">LINK</a></p>
      </template>
    </snt-input>
    <!-- radio -->
    <p>input-radio</p>
    <input type="radio" />
    <snt-input type="radio" label="Im radio label">
      <!-- <template #label>
        <p>
          Radio input <a href="/" class="snt-animate-underline">link to go</a>
        </p>
      </template> -->
    </snt-input>
    <!-- range -->
    <p>input-range</p>
    <input type="range" />
    <snt-input type="range" />
    <!-- file -->
    <p>input-file</p>
    <input type="file" />
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
    <p>input-date</p>
    <input type="date" />
    <snt-input type="date" />
    <!-- time -->
    <p>input-time</p>
    <input type="time" />
    <snt-input type="time" />
  </div>
</template>

<script>
import SntInput from "../components/utils/SntInput.vue";

export default {
  components: { SntInput },
  name: "TestInputs",
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.test-wrapper {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}
</style>
