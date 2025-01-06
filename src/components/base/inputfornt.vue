<template>
    <div class="flex items-center gap-3">
        <label :for="lable_name"> {{label}}</label>
        <input  :value="modelValue"   @input="$emit('update:modelValue', $event.target.value)" :id="lable_name" :type="type" :class="attribute1" :placeholder="placeholder" />
    </div>
</template>
<script>
export default {
    name: "Inputfornt",
    emits: ['update:modelValue'],
    props: {
        modelValue :{
            type: String,
            default: ""            
        },
        value :{
             type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        }  ,
        lable_name: {
            type: String,
            default: ""
        }  ,
        type: {
            type: String,
            default: ""
        }  ,
        placeholder: {
            type: String,
            default: ""
        }  ,
        attribute1: {
            type: String,
            default: ""
        }
    }
}
</script>