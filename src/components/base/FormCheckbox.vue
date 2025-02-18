<template>
    <div class="form-group">
        <label class="checkbox-label">
            <input 
                type="checkbox"
                :checked="modelValue"
                @input="$emit('update:modelValue', $event.target.checked)"
                class="form-checkbox"
            >
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'FormCheckbox',
    props: {
        label: String,
        modelValue: Boolean
    }
}
</script> 