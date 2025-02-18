<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <input 
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            class="form-input"
            v-bind="$attrs"
        >
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        label: String,
        modelValue: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        placeholder: String
    }
}
</script> 