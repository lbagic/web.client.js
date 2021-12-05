<template>
  <div>
    <snt-input :model="{ confirm: form }" />
    <input ref="checkbox" v-model="input.checkbox" type="checkbox" />
    <select ref="select" v-model="input.select">
      <option value="1">OneString</option>
      <option :value="1">OneNumber</option>
    </select>
    <input ref="txtt" type="text" v-bind="inputAttrs" />
    <datalist id="list">
      <option value="aaa"></option>
      <option value="bbb"></option>
    </datalist>
    <pre>{{ computedInput }}</pre>
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import SntInput from "../../components/utils/SntInput.vue";
export default {
  components: { SntInput },
  name: "Playground",
  watch: {
    "input.checkbox"() {
      this.consoleRef(this.$refs.checkbox);
    },
    "input.select"() {
      // this.consoleRef(this.$refs.select);
    },
  },
  data() {
    return {
      input: {
        number: "",
        select: "1",
      },
      form: {
        _valid: true,
        // _fieldsValid: { email: true },
        email: "",
        password: "",
        confirm: {
          type: "password",
          value: "",
          validator: (ctx, value) =>
            ctx.password === value ? "Same passwords." : true,
        },
      },
    };
  },
  methods: {
    consoleRef(ref) {
      console.log({ value: ref.value, checked: ref.checked });
    },
  },
  computed: {
    computedInput() {
      return Object.entries(this.input).reduce((a, [key, value]) => {
        a[key] = [value, typeof value];
        return a;
      }, {});
    },
    inputAttrs() {
      return {
        onInput: () => this.$log("input"),
        on: {
          blur: () => this.$log("blur"),
        },
      };
    },
  },
};
</script>

<style scoped lang="scss"></style>
