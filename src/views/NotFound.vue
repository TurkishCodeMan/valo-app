<script setup lang="ts"></script>

<template>
  <main>
    <div class="info">
      <h2>ERROR 404</h2>
      <p>Sayfa Bulunamadı</p>
      <RouterLink to="/">Anasayfa</RouterLink>
    </div>
    <div class="img-box">
      <img src="../assets/gg.png" alt="" />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: center;
  margin: 2rem;
  gap: 1rem;
  border-radius: 1rem;
  border: 2px solid var(--color-red);
  img {
    width: 100%;
    height: 100%;
  }
  .info {
    h2 {
      font-weight: bold;
      font-size: 3rem;
    }

    p {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    a {
      width: 100%;
      text-decoration: none;
      background: #fa4454;
      color: var(--color-text);
      padding: 0.8rem 8rem;
      margin-top: 2rem;
      display: inline-block;
      border-radius: 0.5rem;
      transition: 0.3s;

      &:hover {
        transform: scale(1.08);
      }
    }
  }
}
</style>
