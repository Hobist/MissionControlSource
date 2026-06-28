<script setup>
import { IconPlusFilled, IconArrowRight, IconCaretRight } from "@tabler/icons-vue";
import NewTaskForm from "../components/NewTaskForm.vue";
import TaskTile from "../components/TaskTile.vue";
</script>

<template>
    <section class="dashboard-wrapper">
        <header class="page-header">
            <h2>Dashboard</h2>

            <button class="btn" @click="openNewTask" :disabled="$store.state.projects.length == 0">
                <IconPlusFilled/> New Task
            </button>
        </header>

        <div class="tasks-wrapper">
            <div class="tasks-list">
                <div class="tasks-header">
                    Tasks
                </div>

                <div class="tasks-list-body">
                    <TaskTile v-for="task in $store.state.tasks.filter(filterTasks).sort(sortTasks)" :key="task.id" :task="task"/>
                    <span class="tasks-none" v-if="$store.state.tasks.filter(filterTasks).length == 0">
                        No tasks
                    </span>
                </div>
            </div>
        </div>
    </section>

    <NewTaskForm ref="newTaskForm" />
</template>

<script>
export default {
    data() {
        return {
            newType: "",
        }
    },
    methods: {
        openNewTask() {
            this.$refs.newTaskForm.$el.classList.toggle("active")
        },
        sortTasks(a, b) {
            const WEIGHT = {
                "HIGH": 0,
                "MEDIUM": 1,
                "LOW": 2,
            };

            return WEIGHT[a.urgency] - WEIGHT[b.urgency] || a.order - b.order;
        },
        filterTasks(task) { 
            return !task.isComplete;
        }
    }
}

</script>

<style>
.dashboard-wrapper {
    /* flex: 1 1 auto; */
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    
    flex: 1 1 auto;
    height: 0;
    /* width: 100%;
    display: flex;
    flex-flow: row nowrap;
    background-color: var(--bg);
    gap: 0.25em; */
}
</style>

