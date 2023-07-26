<template>
  <nav class="navbar navbar-expand-lg navbar-dark nav-bg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/Logo.png" height="35" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase mx-2">
            Home
          </router-link>
        </li>
        <li>
          <button v-if="account.id" class="btn btn-success text-dark text-uppercase mt-3 mt-lg-0 mx-2" type="button" data-bs-toggle="modal" data-bs-target="#eventForm">New Event</button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login class="mx-2 mx-lg-0" />
    </div>
  </nav>
</template>

<script>
  import { computed } from 'vue';
  import { AppState } from '../AppState.js';
  import Login from './Login.vue';

  export default {
    setup() {
      return {
        account: computed(() => AppState.account)
      }
    },
    components: { Login }
  }
</script>

<style scoped>
  a:hover {
    text-decoration: none;
  }

  .nav-bg {
    background: linear-gradient(270deg, #474C61 0%, rgba(71, 76, 97, 0.00) 100%);
  }

  .nav-link {
    text-transform: uppercase;
  }

  .navbar-nav .router-link-exact-active {
    border-bottom: 2px solid var(--bs-success);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media screen and (min-width: 768px) {
    nav {
      height: 64px;
    }
  }
</style>
