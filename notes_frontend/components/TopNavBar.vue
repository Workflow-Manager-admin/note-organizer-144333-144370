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
  padding: 0 2.1rem 0 1.35rem;
  font-family: inherit;
  font-weight: bold;
  border-bottom: 1.5px solid rgba(66,66,66,0.05);
  z-index: 15;
  position: sticky;
  top: 0;
  left: 0;
}

.app-title {
  font-size: 1.28rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-shadow: 0 1.5px 8px rgba(25,118,210,.08);
  color: #fff;
  margin-right: 1rem;
}

@media (max-width: 700px) {
  .navbar { padding: 0 0.4rem 0 0.75rem;}
  .app-title { font-size: 1.08rem; }
}
</style>
