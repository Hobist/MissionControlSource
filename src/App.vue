<script setup>
import { IconPlusFilled, IconLayoutDashboard, IconTimeline } from "@tabler/icons-vue";
import NewProjectForm from "./components/NewProjectForm.vue";
</script>

<template>
  <!-- <HelloWorld/> -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <h1>Mission Control</h1>
    </div>

    <div class="sidebar-body">
      <div class="sidebar-label">views</div>
      <router-link class="router-link" :to="{name: 'Home'}"> <IconLayoutDashboard/> Dashboard</router-link>
      <router-link class="router-link" to="/activity"> <IconTimeline stroke="2" /> Activity</router-link>

      <div class="sidebar-divider"></div>

      <div class="sidebar-label">projects</div>

      <router-link v-for="project in $store.state.projects" class="router-link" :to="{ name: 'Project', params: { id: project.id} }"> {{ project.name }} </router-link>

      <button class="add-btn" @click="openNewProject">
        <IconPlusFilled/> New Project
      </button>
    </div>
   </aside>

  <section class="app-body" ref="section">
    <RouterView></RouterView>
  </section>

  <NewProjectForm ref="newProjectForm" />
</template>

<script>

export default {
  data() {
    return {
    }
  },
  created() {
   this.$store.commit("connect")
  },
  beforeDestroy() {
    this.$store.commit("disconnect")
  },
  methods: {
    openNewProject() {
      this.$refs.newProjectForm.$el.classList.toggle("active")
      // this.isActive = true;
    }
  }

}

</script>