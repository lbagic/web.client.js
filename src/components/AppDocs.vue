<template>
  <a href="http://localhost:8081/overview" target="_blank" class="docs-link">
    <span>Docs</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="13px"
      viewBox="0 0 24 24"
      width="13px"
      fill="white"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
      />
    </svg>
  </a>
</template>

<script>
export default {
  name: "AppDocs",
};
</script>

<style scoped lang="scss">
.docs-link {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  background: #0008;
  color: white;
  border-radius: 3px;
  opacity: 0.8;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #0009;
  }

  display: flex;
  align-items: center;
  padding: 3px 5px;
  & > * + * {
    margin-left: 3px;
  }
}
</style>
