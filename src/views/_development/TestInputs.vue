<template>
  <div>
    <p>Basic inputs</p>
    <div class="test-wrapper">
      <snt-input v-model="basic.text" type="text" label="Text" required />
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
    <button @click="basic.text = basic.text === 'asdf' ? 'qwe' : 'asdf'">
      change model
    </button>
    <pre>{{ basic }}</pre>
    <p>Other inputs</p>
    <div class="test-wrapper">
      <snt-input
        v-model="other.textOptions"
        type="text"
        label="Text (options)"
        :options="[
          { value: 1, label: 'aaa' },
          { value: 2, label: 'bbb' },
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
        optionsLabelPath="value"
        optionsValuePath="id"
        :options="[
          { id: 1, value: 'New York' },
          { id: 2, value: 'Vivaldi' },
          { id: 3, value: 'Antoa' },
          { id: 4, value: 'Bruxelles' },
        ]"
      />
    </div>
    <pre>{{ other }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";

export default {
  components: { SntInput },
  name: "TestInputs",
  data() {
    return {
      basic: {
        text: "asdf",
        email: "igor@mail.com",
        password: "",
        search: "",
        number: 123,
        tel: "",
        url: "",
        textarea: "",
      },
      other: {
        textOptions: "",
        date: "2021-11-04T19:01:00.000Z",
        dateRange: "",
        time: "",
        month: "",
        color: "",
        checkbox: false,
        radio: true,
        range: "",
        file: "",
        select: 2,
      },
    };
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
