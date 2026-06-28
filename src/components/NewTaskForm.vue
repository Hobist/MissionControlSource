<script setup>
import modal from './modal.vue';
</script>

<template>
    <modal>
        <template #modalBase="{close}">
            <div class="form-title">
                New Task
            </div>
    
            <input type="text" v-model="taskName" placeholder="Task Name">
    
            <select name="" id="" v-model="projectSelect">
                <option value="" selected disabled hidden>- Select Project -</option>
                <option v-for="project in $store.state.projects" :value="project.id">{{ project.name }}</option>
            </select>
    
            <select name="" id="" v-model="urgency">
                <option value="" selected disabled hidden>- Select Urgency -</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
            </select>
    
            <button class="btn modal-btn" @click="create(close)">Add</button>
        </template>
    </modal>
</template>

<script>

export default {
    data() {
        return {
            taskName: "",
            projectSelect: "",
            urgency: "",
        }
    },
    methods: {
        create(handleClose) {
            if (this.taskName == "") { return ; }
            else if (this.projectSelect == "") { return ; }
            else if (this.urgency == "") { return ; }

            this.$store.commit("createTask", {
                "name": this.taskName,
                "projectID": this.projectSelect,
                "urgency": this.urgency,
                "created": new Date(),
                "isComplete": false,
                "order": 10000,
                "completed": 0
            })

            handleClose();
            this.taskName = "";
            this.projectSelect = "";
            this.urgency = "";
        }
    },
}

</script>

<style>

.form-title {
    font-size: 1em;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: .05em;
    /* margin-bottom: .75rem; */
}

.modal-btn {
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
}

</style>