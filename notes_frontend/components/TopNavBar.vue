<template>
  <nav class="navbar">
    <div class="app-title">Notes App</div>
    <slot></slot>
  </nav>
</template>

<script setup lang="ts">
// No logic needed, purely presentational bar
</script>

<style scoped>
.navbar {
  height: var(--topbar-height);
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1.75rem;
  font-family: inherit;
}
.app-title {
  font-size: 1.25rem;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
