<template>
    <div class="custom__select">
        <div class="input__wrapper" @click="showList = !showList">
            <p>{{ title }}</p>
            <input type="text" readonly :value="selected.name">
        </div>
        <div  class="selct__options" v-if="showList">
            <div
                class="selct__option"
                v-for="item in data"
                :key="item"
                @click="[selectItem(item), showList = !showList]"
                :class="{'active': selected.value == item.value}"
            >
                {{ item.name}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array
        },
        title: String,
    },
    data() {
        return {
            showList: false,
            selected: {},
        }
    },
    setup(props) {
      
        // selected = props.data[0];
        
    },
    mounted() {
        this.selected = this.data[0]
    },
    methods: {
        selectItem(i) {
            this.selected = i;
            this.$emit('selectResult', this.selected.value);
        }
    }
}
</script>