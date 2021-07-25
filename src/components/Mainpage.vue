<template>
  <div>
    <Inputbox ref="inputref" :inputbox="inputoptions"
      @toggle-navigation="toggleNavigation( $event )" @toggle-options="toggleOptions" 
      @set-option="setOption" @validate-save="validateInput" @reset-prev="setPrev"
      @show-trash="showTrash" @hide-trash="hideTrash" @reset-state="resetState" />
    
    <div class="sampleoutput"> <strong>Sample Output: </strong><br>
      Type: {{ inputoptions.type == 'page' ? 'URL' : inputoptions.type }} <br>
      Value: {{ inputoptions.value == 'URL' ? '' : inputoptions.value }} <br>
      Validation: {{ inputoptions.validation ? 'Passed' : 'Failed' }} <br>
      Open URL in: {{ inputoptions.type == 'page' ? ( inputoptions.open == 'tab' ? 'New Tab' : 'Same Tab') : 'Not applicable' }}<br>
    </div>
  </div>
</template>


<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Inputbox from '@/components/Inputbox.vue';

  @Options({
    components: {
      Inputbox,
    },
  })
  export default class Mainpage extends Vue {

    inputoptions = {
      type: 'page',
      open: '',
      showoptions: false,
      validation: true,
      value: 'URL',
      delete: false
    };

    prevoptions = this.inputoptions;

    // Set whether to open the page in same tab or different tab.
    toggleNavigation(): void{
    
      if( this.inputoptions.type == 'page'){

        this.inputoptions.open = this.inputoptions.open ? '' : 'tab';

      }
    };

    // show or hide the pop over options to change input type
    toggleOptions(): void{
      this.inputoptions.showoptions = !this.inputoptions.showoptions;
    };

    // Set the input type
    setOption( type: string ){
      this.prevoptions = this.inputoptions;

      this.inputoptions = {
        type: type,
        open: '',
        showoptions: false,
        validation: false,
        value: '',
        delete: false
      };
    };

    // Validate the inputs and save
    validateInput(){
      let val = this.inputoptions.value;

      //Empty data check
      if( !this.inputoptions.value.trim().length ){
        this.inputoptions.validation = false;
      }      
      //url validation
      else if( this.inputoptions.type === 'page' ){
        this.inputoptions.validation = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/i.test(val);
      } 
      //Email validation
      else if( this.inputoptions.type === 'email' ) {
        this.inputoptions.validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
      } 
      //phone validation
      else if( this.inputoptions.type === 'phone' ) {
        this.inputoptions.validation = /^([0|\+[0-9]{1,5})?([1-9][0-9]{9})$/.test(val);
      }

      if( this.inputoptions.validation ){
        
        //set vuex state or the prevoptions that I used here
        this.prevoptions = this.inputoptions;
      }
      
    };

    // Discard changes and save to previous state
    setPrev(){
      this.inputoptions = this.prevoptions;
      this.inputoptions.showoptions = false;
    };

    // show  and hide delete option on mouse over and out
    showTrash(){
      if( this.inputoptions.value != '' && this.inputoptions.value != 'URL' && this.inputoptions.validation ){
        this.inputoptions.delete = true;
      }
    };
    hideTrash(){
      this.inputoptions.delete = false;
    };

    // Reset to default state, we can use vuex here
    resetState(){
      this.inputoptions = {
        type: 'page',
        open: '',
        showoptions: false,
        validation: true,
        value: 'URL',
        delete: false
      };

      this.prevoptions = this.inputoptions;
    }

  }
</script>

<style lang="scss" scoped>
  .sampleoutput{
    margin-left: 20%;
    line-height: 1.5;
  }
</style>




