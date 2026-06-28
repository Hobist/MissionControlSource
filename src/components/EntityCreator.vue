
<template>
    <div class="creator-wrapper">     
        <label for="newSelect">New:</label>
        <select name="newSelect" id="newSelect" v-model="newType">
            <option value="" selected disabled hidden>-- Select New Type --</option>
            <option value="project">Project</option>
            <option value="task">Task</option>
        </select>
        
        <div class="new-project-form" v-if="newType == 'project'">
            <input type="text" class="txt-field" placeholder="Project Name">
        </div>

        <div class="new-task-form" v-if="newType == 'task'">
            <input type="text" class="txt-field" placeholder="Task Name">
            
            <select name="urgencyLevel" id="urgencyLevel">
                <option value="" selected disabled hidden>-- Project --</option>
                <option value="1">HIGH</option>
                <option value="2">MEDIUM</option>
                <option value="3">LOW</option>
            </select>

            <select name="urgencyLevel" id="urgencyLevel">
                <option value="" selected disabled hidden>-- Select Urgency Level --</option>
                <option value="1">HIGH</option>
                <option value="2">MEDIUM</option>
                <option value="3">LOW</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newType: "",

        }
    }
}
</script>