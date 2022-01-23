<script>
    import  TimePickerModal  from 'svelte-time-picker' // the modal including the TimePicker component
    import { fade } from 'svelte/transition'

    let showmodal = false
    export function show() {
		  showmodal = true;
	  }
    export function hide() {
      showmodal = false;
    }
    /* Callbacks */
    let cancelCallback = (event) => {
      let date = event.detail
      
    }
    let changeCallback = (event) => {
      let date = event.detail
      
    }
    let okCallback = (event) => {
      let date = event.detail
      close
    }
  
    /* Closes this modal */
    function close () {
      showmodal = false // will be closed by the App
    }
  
    /* The TimePicker options */
    let options = {
		is24h: true,
		bgColor: '#9b2c2c',
		hasButtons: true,
		timeClassName: ' bg-gray-500 rounded-t-lg justify-around',
		buttonBarClassName: 'rounded-b-lg'
	};
  </script>
  
  {#if showmodal}
  <div transition:fade={ {duration: 300} }>
    <TimePickerModal {options}
      on:cancel={cancelCallback}
      on:change={changeCallback}
      on:ok={okCallback}
      on:close={close}
    />
  </div>
  {/if}