<template>
  <div>
    <p>Example form</p>
    <div class="snt-grid">
      <snt-input label="Text label" required />
      <snt-input type="checkbox" label="I am a label" help="Halp me" required />
      <snt-input
        type="radio"
        label="I am radio with a really really really loooooooooooooong label"
        required
      />
      <snt-input
        type="range"
        label="Range label"
        labelPosition="block end"
        required
      />
    </div>
    <p>Basic inputs</p>
    <div class="test-wrapper">
      <snt-input
        v-model="basic.text"
        type="text"
        label="Text"
        required
        error="Woopsie daisy"
      />
      <snt-input v-model="basic.email" type="email" label="Email" required />
      <snt-input
        v-model="basic.password"
        type="password"
        label="Password"
        required
      />
      <snt-input v-model="basic.search" type="search" label="Search" required />
      <snt-input v-model="basic.number" type="number" label="Number" required />
      <snt-input v-model="basic.tel" type="tel" label="Telephone" required />
      <snt-input v-model="basic.url" type="url" label="Url" required />
      <snt-input
        v-model="basic.textarea"
        type="textarea"
        label="Textarea"
        required
      />
    </div>
    <button @click="basic.text = 'asdf'">asdf</button>
    <button @click="basic.text = 'qwe'">qwe</button>
    <pre>{{ basic }}</pre>
    <p>Other inputs</p>
    <button @click="select1">One</button>
    <button @click="select2">Two</button>
    <div class="test-wrapper">
      <snt-input
        v-model="other.textOptions"
        type="text"
        label="Text (options)"
        :options="[
          { id: 1, label: 'aaa' },
          { id: 2, label: 'bbb' },
        ]"
        required
      />
      <snt-input v-model="other.date" type="date" label="Date" required />
      <snt-input
        v-model="other.dateRange"
        type="date"
        label="Date (range)"
        required
        :datetimeOptions="{ range: true }"
      />
      <snt-input v-model="other.time" type="time" label="Time" required />
      <snt-input v-model="other.month" type="month" label="Month" required />
      <snt-input v-model="other.color" type="color" label="Color" required />
      <snt-input
        v-model="other.checkbox"
        type="checkbox"
        label="Checkbox"
        required
      />
      <snt-input
        v-model="other.radio"
        type="radio"
        label="Im radio label"
        required
      />
      <snt-input v-model="other.range" type="range" label="Range" required />
      <snt-input v-model="other.file" type="file" label="File" required />
      <snt-input
        v-model="other.select"
        type="select"
        label="Select"
        required
        option-label-by="city"
        :option-id-by="(el) => el.cityId"
        :options="[
          { cityId: 1, city: 'New York' },
          { cityId: 2, city: 'Vivaldi' },
          { cityId: 3, city: 'Antoa' },
          { cityId: '4', city: 'Bruxelles' },
        ]"
      />
    </div>
    <pre>{{ other }}</pre>
    <pre>{{ typeof other.select }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";

const o1 = {
  textOptions: 2,
  date: "2021-11-04T19:01:00.000Z",
  dateRange: ["2021-11-04T19:01:00.000Z", "2022-11-04T19:01:00.000Z"],
  time: { hours: 6, minutes: 25 },
  month: { month: 5, year: 1990 },
  color: "#ff0000",
  checkbox: true,
  radio: false,
  range: 90,
  file: "",
  select: 2,
};
const o2 = {
  textOptions: 1,
  date: "2020-11-04T19:01:00.000Z",
  dateRange: ["2020-11-04T19:01:00.000Z", "2022-11-04T19:01:00.000Z"],
  time: { hours: 5, minutes: 1 },
  month: { month: 1, year: 2000 },
  color: "#00ff00",
  checkbox: false,
  radio: true,
  range: 50,
  file: "",
  select: 1,
};

export default {
  components: { SntInput },
  name: "TestInputs",
  data() {
    return {
      basic: {
        text: "asdf",
        email: "igor@mail.com",
        password: "qweqwe",
        search: "asdsad",
        number: 123,
        tel: "123123",
        url: "https",
        textarea: "asdf",
      },
      other: o1,
    };
  },
  methods: {
    select1() {
      this.other = o1;
    },
    select2() {
      this.other = o2;
    },
  },
};
</script>

<style scoped lang="scss">
.test-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}
</style>
