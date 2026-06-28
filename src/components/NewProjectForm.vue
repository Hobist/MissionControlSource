<script setup>
import modal from './modal.vue';
</script>

<template>
    <modal>
        <template #modalBase="{close}">
            <div class="form-title">
                New Project
            </div>
    
            <input type="text" v-model="projectName" placeholder="Project Name">
    
            <button class="btn modal-btn" @click="create(close)">Create</button>
        </template>
    </modal>
</template>

<script>

export default {
    data() {
        return {
            projectName: "",
        }
    },
    methods: {
        create(handleClose) {
            if (this.projectName == "") { return ; }

            this.$store.commit("createProject", {
                "name": this.projectName,
                "created": new Date(),
            })
            handleClose();
            this.projectName = ""
        }
    }
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