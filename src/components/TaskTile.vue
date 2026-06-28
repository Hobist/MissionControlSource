<script setup>
import { IconCircleFilled } from '@tabler/icons-vue';
</script>

<template>
  <div class="task-tile" :class="{complete: task.isComplete}">
    <input type="checkbox" v-model="task.isComplete" @change="toggleComplete"/>
    <span class="task-info">
      <span class="task-name">{{ task.name }}</span>
      <!-- <span class="task-project">{{ task.projectID }}</span> -->
    </span>
    <span class="urgency" :class="task.urgency">
      <IconCircleFilled/>
      {{ task.urgency }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    toggleComplete() {
        if (this.$props.task.isComplete) {
          this.$props.task["completed"] = new Date();
        }
        this.$store.commit("updateTaskStatus", {...this.$props.task})
      }
    }
}
</script>

<style>
.task-tile {  
  font-size: inherit;
  padding: 0.65em 1em;
  /* border-radius: 5px; */
  border-top: 1px solid var(--border);

  display: grid;
  grid-template-columns: min-content auto auto min-content;
  align-items: center;
  flex: 1 1 auto;

  &.complete { 
    opacity: 0.5; 
    .task-name { text-decoration: line-through;}
  }

  &:first-child {
    border-top: none;
  }

  input[type=checkbox] {
    font-size: 24px;
    width: 1em;
    cursor: pointer;
  }

  .task-info {
    text-align: left;
    padding: 0 0.5em;
    display: flex;
    flex-direction: column;
    /* max-width: 50%; */

    .task-name {
      font-size: 1.1em;
      flex: 1 1 auto;
      color: var(--text-h);
      text-wrap: wrap;
      /* height: 0; */
    }
    .task-project {
      font-size: 12px;
      opacity: 0.5;
      flex: 0 1 auto;
      height: fit-content;
    }
  }

  .urgency {
    text-align: right;
    font-size: 0.75em;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    font-weight: 600;
    gap: 0.25em;
    /* opacity: 0.7; */

    svg {
      width: 0.5em;
      margin: auto 0;
    }

    &.HIGH { color: var(--urgency-red);  }
    &.MEDIUM { color: var(--urgency-yellow); }
    &.LOW { color: var(--urgency-green); }
  }
}

</style>