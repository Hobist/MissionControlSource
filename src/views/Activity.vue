<template>
    <div>
        <div v-for="value in $store.state.tasks.filter(filterTasks)" class="hi">
            {{ value.name }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            monday: new Date(),
            friday: new Date(),
        }
    },
    created() {
        const current = new Date();
        const currentDayIndex = current.getDay();
        
        const distanceToMonday = currentDayIndex === 6 ? -6 : 1-currentDayIndex;
        
        const monday = new Date(current);
        monday.setDate(current.getDate() + distanceToMonday);
        monday.setHours(0, 0, 0, 0);

        const friday = new Date(monday);
        friday.setDate(monday.getDate() + 4);
        friday.setHours(23, 59, 59, 99);

        this.monday = monday;
        this.friday = friday;
        console.log(this.monday, this.friday);
    },
    mounted() {
        // console.log("mounted")
        // for(let i = 0; i < 5; i++) {
        //     this.prevWeek();
        // }
    },
    methods: {
        prevWeek() {
            const prevMonday = new Date(this.monday);
            prevMonday.setDate(this.monday.getDate() - 7);

            const prevFriday = new Date(this.friday);
            prevFriday.setDate(this.friday.getDate() - 7);

            this.monday = prevMonday;
            this.friday = prevFriday;

            console.log(this.monday, this.friday)
        },
        nextWeek() {

        },
        filterTasks(task) {
            return task.isComplete && ( this.monday < task.completed && task.completed < this.friday )
        }
    }
}

</script>