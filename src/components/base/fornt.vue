<template>
    <form :class="attribute" :action=" action" method="post">
        <slot></slot>
        
    </form>
</template>
<script>    
export default {
    
    name: "Fornt",
    props: {
        action: {
            type: String,
            default: ""
        } , 
        
        attribute: {
            type: String,
            default: ""
        },
        type :{
            type : String , 
             default : " ", 
        },
    

    }
}
</script>