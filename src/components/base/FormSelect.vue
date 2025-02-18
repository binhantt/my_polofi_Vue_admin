<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <select 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-select"
            v-bind="$attrs"
        >
            <slot></slot>
        </select>
    </div>
</template>

<script>
export default {
    name: 'FormSelect',
    props: {
        label: String,
        modelValue: String
    }
}
</script> 