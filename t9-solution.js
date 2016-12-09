$(document).ready(function(){
	var counter = -1;
    var pre_mouseup_time = 0;
    var current_mouseup_time = 0;
    var mousedown_time = 0;
    var previous_button_value = -1;
    var keypad = $('.key');
    keypad.mousedown(function(event){
    	mousedown_time = new Date();
    });
    keypad.mouseup(function(event){
    	current_mouseup_time = new Date();
      var click_interval = current_mouseup_time - pre_mouseup_time;
      var mouseup_interval = current_mouseup_time - mousedown_time;
   		var button_clicked = event.currentTarget;		
  		var button_value = $(button_clicked).attr('data-value');
      var same_button = (previous_button_value == button_value);
      if(!same_button){
      	counter = 0;
      }
      if(button_value >= 1 && button_value <= 9 ){
      	print_character(button_value, button_clicked, mouseup_interval, click_interval, same_button);
      } else {
      	print_button_clicked(button_value);
      }
       previous_button_value = button_value;
       pre_mouseup_time = current_mouseup_time;
    })
   
  function print_character(button_value, button_clicked, mouseup_interval, click_interval, same_button){
    var character_array = $(button_clicked).find('span')[0].innerHTML.split(' ');
    var len = character_array.length;
    var value = $('#result').val();
    if(counter >= len || click_interval > 1000){
      counter = 0;
    };
    if(mouseup_interval > 1000){
      value += button_value;
      $('#result').val(value);
      counter = 0;
    }else{
      if(click_interval < 1000 && same_button){
      	value = value.slice(0, -1) + character_array[counter];
        counter += 1;
      }else{ 
        value += character_array[counter];
        counter += 1;
      };
      $('#result').val(value);
    }
  }
  function print_button_clicked(button_value){
    var value = $('#result').val();
    value += button_value;
    $('#result').val(value);
  }
});