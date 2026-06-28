<script setup>
import { IconArchive, IconPlusFilled, IconTrashFilled } from "@tabler/icons-vue";
import TaskTile from "../components/TaskTile.vue";

import NoteEditor from "../components/NoteEditor.vue";

</script>

<template>    
    <div class="project-page-wrapper">
        <NoteEditor :id="id" @change="saveChange"/>

        <div class="project-sidebar">
            <header class="page-header">
              <h2>{{project.name}}</h2>
            </header>
            
            <section class="project-wrapper">
                <div class="tasks-wrapper">
                    <div class="tasks-list">
                        <div class="tasks-header">
                            Tasks
                            <!-- <button class="btn small" @click="openNewTask" :disabled="$store.state.projects.length == 0">
                                <IconPlusFilled/> Task
                            </button> -->
                        </div>
        
                        <div class="tasks-list-body">
                            <TaskTile v-for="task in $store.state.tasks.filter(filterTasks).sort(sortTasks)" :key="task.id" :task="task"/>
                            <span class="tasks-none" v-if="$store.state.tasks.filter(filterTasks).length == 0">
                                No tasks
                            </span>
                        </div>
                    </div>
                    
                    <!-- <button class="btn archive">
                        <IconArchive stroke="{0.5}" /> Archive
                    </button>
                    <button class="btn delete">
                        <IconTrashFilled /> Delete
                    </button> -->
                </div>
            </section>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        id: String
    },
    data() {
        return {
            project: {},
        }
    },
    created() {
        this.project["name"] = ""
    },
    async beforeMount() {
        // get the project information
        let res = await this.$store.dispatch("getProject", this.$props.id)
        if (res.length > 0) {
            this.project = res[0]
        }
    }, 
    watch: {
        async "$store.state.projects"() {
            let res = await this.$store.dispatch("getProject", this.$props.id)
            this.project = res[0]
        }
    },
    methods: {
        sortTasks(a, b) {
            const WEIGHT = {
                "HIGH": 0,
                "MEDIUM": 1,
                "LOW": 2,
            };

            return a.isComplete - b.isComplete || WEIGHT[a.urgency] - WEIGHT[b.urgency] || a.order - b.order;
        },
        filterTasks(task) { 
            return task.projectID == this.$props.id;
        },
        saveChange(evt) {
            console.log(evt)
        }
    }
}

</script>

<style>
.project-page-wrapper {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    min-width: 0;
    overflow-y: auto;
}

.project-sidebar {
    /* background-color: var(--code-bg); */
    flex: 1 1 auto;
    height: 100%;

    display: flex;
    flex-direction: column;
    max-width: 35%;
}

.project-wrapper {
    flex: 1 1 auto;
    height: 0;
    display: flex;
    flex-flow: column;
    font-size: 12px;
}
</style>