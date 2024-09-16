<template>
    <div class="calc__mortgage">
        <h1>Ипотечный калькулятор</h1>
        <div class="formAndOther">
            <Form_mortgage class="card"></Form_mortgage>
            <Other_mortgage class="card"></Other_mortgage>
        </div>
        <Table_mortgage></Table_mortgage>
    </div>
    
</template>
<script>
import Form_mortgage from '@/components/Calc__mortgage/Form/Form_mortgage.vue';
import Other_mortgage from '@/components/Calc__mortgage/Other__info_mortgage/Other_mortgage.vue';
import Table_mortgage from '@/components/Calc__mortgage/table/Table_mortgage.vue';

export default {
    name: 'Calc_mortgage',
    components: {
        Form_mortgage,
        Other_mortgage,
        Table_mortgage
    },
    data() {
        return {
          
        }
    },
    mounted() {
        console.log("store getters: ", this.$store.getters.count)
    }

}

</script>
<style lang="scss">
    .formAndOther {
        // max-width: 1400px;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        .formAndOther__half {
            flex: 1;
        }
    }
</style>