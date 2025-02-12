<template>
    <div class=" ">
      <div :class="modal_open">
      <div :class="modal">
        <div :class="bg_modal">
          <div class="flex jusify-bettewn">
            <h5 :class="modal_title">{{ title }}</h5>
            <button type="button" :class="btn_close" @click="closeModal"  >x</button>
          </div>
          <form :class="modal_body">
            <slot></slot>
          </form>
          <button  @click="btn_click " class="close button has-background-success text-white">
            {{ namebutton }}
          </button>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    props: {
      modal_open: {
        type: String,
        default: "",
      },
      modal: {
        type: String,
        default: "",
      },
      bg_modal: {
        type: String,
        default: "",
      },
      modal_content: {
        type: String,
        default: "",
      },
      modal_title: {
        type: String,
        default: "",
      },
      modal_body: {
        type: String,
        default: "",
      },
      btn_close: {
        type: String,
        default: "",
      },
      namebutton: {
        type: String,
        default: "  ",
      },
      title: {
        type: String,
        default: "",
      },
    },
    methods: {
    closeModal() {  
      this.$emit("close"); // Phát sự kiện close ra ngoài
    },
    btn_click() {
      this.$emit("click");
    },
  },
  };
  </script>
  
  
  