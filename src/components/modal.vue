<template>
    <div class="modal-wrapper" @click="close" ref="modal">
        <div class="modal-body" @click.stop>
            <slot name="modalBase" :close="close"></slot>
        </div>
    </div>
</template>

<script>

export default {
    watch: {
        shouldClose(nv, ov) {
            if (nv) {
                this.close()
                this.$props.shouldClose = false;
            }
        }
    },
    methods: {
        close() {
            this.$refs.modal.classList.remove("active")
        }
    }
}

</script>

<style>
.modal-wrapper {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: var(--social-bg);

    display: grid;
    place-items: center;
    display: none;

    &.active {
        display: grid;
    }

    &:hover {
        cursor: pointer;
    }

    .modal-body {
        background-color: var(--bg);
        padding: 1em;
        border: 2px solid var(--border);
        border-radius: 8px;
        cursor: default;
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
}

</style>