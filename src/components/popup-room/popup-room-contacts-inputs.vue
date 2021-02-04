<template lang="pug">
    .popup-add-room__option.popup-add-room__option_vertical
        .popup-add-room__option-title.mb-2 {{ contactsType.name }}
        .d-flex.w-100(v-for="(value,key, index) in values" :key="key")
            input.popup-add-room__option-input.w-100(:type="contactsType.type" v-model="values[key]")
            button.btn.popup-add-room__btn-phone(type="button"  @click="removeInput(key, index)")
                i.fas.fa-times
            button.btn.popup-add-room__btn-phone(type="button" v-if="index === 0" @click="addInput")
                i.fas.fa-plus-circle
</template>

<script>
import vSelect from "../v-select/components/Select.vue";
import uniqueid from 'lodash.uniqueid';
import popupRoomServices from "./popup-room-services.vue"
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            values: {}
        };
    },
    watch: {
        values: {
            deep: true,
            handler() {
                this.$emit('changeContacts', this.valuesForSend());
            }
        }
    },
    props: {
        contactsType: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    type: ''
                }
            }
        },
        contactsValues: {
            type: Array,
            default:() => {
                return [];
            }
        }
    },
    methods: {
        removeInput(key,index) {
            const result = {};

            if (index === 0 && Object.keys(this.values).length === 1) {
                this.values[key] = '';
                return;
            }

            for (const k in this.values) {
                if (k !== key) {
                    result[k] = this.values[k];
                }
            }

            this.values = result;
        },
        addInput() {
            const newInput = {};

            newInput[uniqueid(`${this.contactsType.type}_`)] = '';
            this.values = {...this.values, ...newInput};
        },
        valuesForSend() {
            return Object.values(this.values).filter((el) => !!el);
        }
    },
    components: {},
    computed: {},
    mounted() {
        if (Array.isArray(this.contactsValues) && this.contactsValues.length) {
            this.values = this.contactsValues.reduce((acc, el) => {
                acc[uniqueid(`${this.contactsType.type}_`)] = el;

                return acc;
            }, {});
        } else {
            this.addInput();
        }
    }
};
</script>

<style >
.v-select-custom-room .vs__actions {
  font-size: 14px;
  top: -34px;
  left: 100px;
}

.v-select-custom-room .vs__dropdown-toggle {
  padding-right: 90px;
}
</style>