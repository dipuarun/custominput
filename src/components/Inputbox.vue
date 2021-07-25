<template>
  <div class="main">

    <!-- Pop-over menu -->
    <div class="actions-div" v-show=" inputbox.showoptions ">      
      <span class="sub-actions" @click="setOption('email')">
        <span class="fa fa-envelope"></span> &nbsp; Link to Email
      </span>
      <span class="sub-actions" @click="setOption('page')">
        <span class="fa fa-file"></span> &nbsp; Link to Page
      </span>
      <span class="sub-actions" @click="setOption('phone')">
        <span class="fa fa-mobile"></span> &nbsp; Link to Phone
      </span>
    </div>

    <div :class="contentclass">
      <!-- action icons -->
      <div :class="toggleoptionsclass" @click="toggleOptions" v-if=" inputbox.validation ">
        <span class="fa fa-link" v-if="inputbox.type === 'page'"></span>
        <span class="fa fa-mobile" v-if="inputbox.type === 'phone'"></span>
        <span class="fa fa-envelope" v-if="inputbox.type === 'email'"></span>
      </div>

      <!-- input area --->
      <div class="input-area" @mouseover="showTrash" @mouseout="hideTrash">

        <input type="text" class="inputbox" id="input-box" :readonly="inputbox.validation" 
          v-model="inputbox.value" @click="firstUpdate" autocomplete="off">

        <!-- delete on hover -->
        <span class="icon" v-show=" inputbox.delete " @click="resetState">
          <span class="fa fa-trash"></span>
        </span>
      </div>

      <!-- Save or discard --->
      <div class="icon save-data" @click="validateSave" v-if=" !inputbox.validation ">
        <span class="fa fa-check"></span>
      </div>
      <div class="icon" v-if=" !inputbox.validation " @click="resetPrev">
        <span class="fa fa-times"></span>
      </div>

       <!-- whether to open in same tab or new tab -->
      <div :class="navclass" @click="toggleNavigation" v-if=" inputbox.validation ">
        <span class="fa fa-external-link"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, computed } from 'vue';

  export default {
    name: 'Inputbox',
    props: {
      inputbox: {
        type: Object,
        required: true,
        default: () => ({ type: '', open: '', showoptions: false, validation: true, value: '' }),
      },
    },
    emits: ['set-option','toggle-navigation','toggle-options', 'validate-save', 'reset-prev', 'show-trash', 'hide-trash', 'reset-state'],

    setup(props, { emit }) {

      props = reactive(props);
      return {

        //classes
        navclass : computed(() => ({
          'icon nav-same-tab': props.inputbox.open !== 'tab',
          'icon nav-new-tab': props.inputbox.open === 'tab',
        })),
        toggleoptionsclass : computed(() => ({
          'icon options-select': props.inputbox.showoptions,
          'icon options': !props.inputbox.showoptions,
        })),
        contentclass : computed(() => ({
          'content normal': props.inputbox.validation,
          'content focused': !props.inputbox.validation,
        })),

        setOption( type ) {
          emit('set-option', type);
        },

        toggleNavigation(){
          emit('toggle-navigation');
        },

        toggleOptions(){
          emit('toggle-options');
        },

        validateSave(){
          emit('validate-save');
        },

        resetPrev(){
          emit('reset-prev');
        },

        firstUpdate(){
          let fval = 'URL';

          if( props.inputbox.value === fval && props.inputbox.validation ){

            //trigger first update
            emit('set-option', 'page');
          }

        },

        showTrash(){
          emit('show-trash');
        },

        hideTrash(){
          emit('hide-trash');
        },

        resetState(){
          emit('reset-state');
        }

      };
    },
  };
</script>

<style lang="scss">
  
  @import url( 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

  @import './../styles.scss';

</style>
