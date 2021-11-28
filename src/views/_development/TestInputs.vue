<template>
  <div>
    <div class="test-wrapper">
      <snt-input v-model="form.text" type="text" label="Text" required />
      <snt-input
        v-model="form.textOptions"
        type="text"
        label="Text (options)"
        :options="[
          { value: 1, label: 'aaa' },
          { value: 2, label: 'bbb' },
        ]"
        required
      />
      <snt-input v-model="form.email" type="email" label="Email" required />
      <snt-input
        v-model="form.password"
        type="password"
        label="Password"
        required
      />
      <snt-input v-model="form.date" type="date" label="Date" required />
      <snt-input
        v-model="form.dateRange"
        type="date"
        label="Date (range)"
        required
        :datetimeOptions="{ range: true }"
      />
      <snt-input v-model="form.time" type="time" label="Time" required />
      <snt-input v-model="form.month" type="month" label="Month" required />
      <snt-input v-model="form.search" type="search" label="Search" required />
      <snt-input v-model="form.number" type="number" label="Number" required />
      <snt-input v-model="form.tel" type="tel" label="Telephone" required />
      <snt-input v-model="form.color" type="color" label="Color" required />
      <snt-input v-model="form.url" type="url" label="Url" required />
      <snt-input
        v-model="form.checkbox"
        type="checkbox"
        label="Checkbox"
        required
      />
      <snt-input
        v-model="form.radio"
        type="radio"
        label="Im radio label"
        required
      />
      <snt-input v-model="form.range" type="range" label="Range" required />
      <snt-input v-model="form.file" type="file" label="File" required />
      <snt-input
        v-model="form.textarea"
        type="textarea"
        label="Textarea"
        required
      />
      <snt-input
        v-model="form.select"
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
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";

export default {
  components: { SntInput },
  name: "TestInputs",
  data() {
    return {
      form: {
        text: "",
        textOptions: "",
        email: "",
        password: "",
        date: "",
        dateRange: "",
        time: "",
        month: "",
        search: "",
        number: "",
        tel: "",
        color: "",
        url: "",
        checkbox: "",
        radio: "",
        range: "",
        file: "",
        textarea: "",
        select: "",
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
