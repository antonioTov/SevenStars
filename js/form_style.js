<!--
/*----------------------------------------------------------------------------*/
//Плагин стилизации элементов формы (checkbox, file, radio, select)
(function($)
{
   var method =
   {
      'init' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_checkbox(this);
            form_file(this);
            form_radio(this);
            form_select(this);
            form_switch(this);
         });
      },

      'death' : function()
      {
         return this.each(function()
         {
            form_death(this);
         });
      },

      'checkbox' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_checkbox(this);
         });
      },

      'file' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_file(this);
         });
      },

      'radio' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_radio(this);
         });
      },

      'select' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_select(this);
         });
      },

      'switch' : function()
      {
         return this.each(function()
         {
            form_death(this);
            form_switch(this);
         });
      }
   };

/*----------------------------------------------------------------------------*/
   //Функция удаления стилизации элементов формы
   function form_death(obj)
   {
      if(($(obj).is('input:checkbox')) && ($(obj).parent().is('div.checkbox')))
      {
         $(obj).parent('div.checkbox').children('div').remove();
         $(obj).unwrap().css('display', 'inline');
         return;
      }
      if(($(obj).is('input:file')) && ($(obj).parent().is('div.file')))
      {
         $(obj).parent('div.file').children('div').remove()
         $(obj).unwrap().css('opacity', 1);
         return;
      }
      if(($(obj).is('input:radio')) && ($(obj).parent().is('div.radio')))
      {
         $(obj).parent('div.radio').children('div').remove()
         $(obj).unwrap().css('display', 'inline');
         return;
      }
      if(($(obj).is('select:not(.switch)')) && ($(obj).parent().is('div.select')))
      {
         $(obj).parent('div.select').children('div, ul').remove()
         $(obj).unwrap().css('display', 'inline');
         return;
      }
      if(($(obj).is('select.switch')) && ($(obj).parent().is('div.switch')))
      {
         $(obj).parent('div.switch').children('div').remove()
         $(obj).unwrap().css('display', 'inline');
         return;
      }
   }

/*----------------------------------------------------------------------------*/
   //Функции стилизации input:checkbox
   function form_checkbox(obj)
   {
      if(!$(obj).is(':checkbox'))
      {
         return;
      }

      $(obj).css('display', 'none').change(function()
      {
         form_checkbox_change(this);
      }).wrap("<div class='checkbox'></div>").parent('div.checkbox').prepend('<div></div>');
      form_checkbox_change(obj);
   }

   function form_checkbox_action(obj)
   {
      if($(obj).hasClass('checkbox_e0'))
      {
         $(obj).removeClass().addClass('checkbox_e1').parent('div').children('input:checkbox').prop('checked', true).change();
      }
      else
      {
         $(obj).removeClass().addClass('checkbox_e0').parent('div').children('input:checkbox').prop('checked', false).change();
      }
   }

   function form_checkbox_change(obj)
   {
      $(obj).not(':enabled').parent('div.checkbox').children('div').removeClass().addClass('checkbox_d1').unbind('click');
      $(obj).not(':enabled, :checked').parent('div.checkbox').children('div').removeClass().addClass('checkbox_d0');
      $(obj).not(':disabled').parent('div.checkbox').children('div').removeClass().addClass('checkbox_e1').unbind('click').bind('click', function()
      {
         form_checkbox_action(this);
      });
      $(obj).not(':disabled, :checked').parent('div.checkbox').children('div').removeClass().addClass('checkbox_e0');
   }

/*----------------------------------------------------------------------------*/
   //Функции стилизации input:file
   function form_file(obj)
   {
      if(!$(obj).is(':file'))
      {
         return;
      }

      $(obj).css('opacity', 0).addClass('file').change(function()
      {
         form_file_change(this);
      }).wrap("<div class='file'></div>").parent('div.file').prepend("<div class='file_icon'></div><div class='file_name'></div><div class='btn_file'></div>");
      $(obj).parent('div.file').width($(obj).width());
      form_file_change(obj);
   }

   function form_file_change(obj)
   {
      $(obj).not(':enabled').parent('div.file').unbind('hover.form_style').css('opacity', 0.5);
      $(obj).not(':disabled').parent('div.file').bind('hover.form_style', function()
      {
         $(this).parent('div.file').children('div.btn_file').addClass('btn_file_hover');
      }, function()
      {
         $(this).parent('div.file').children('div.btn_file').removeClass('btn_file_hover');
      }).css('opacity', 1);
      $(obj).parent('div.file').children('div.file_name').html($(obj).val());

      if($(obj).parent('div.file').children('div.file_icon').css('display') != 'none')
      {
         ico = $(obj).parent('div.file').children('div.file_icon').css('background-image');
         ico = ico.substr(0, parseInt(ico.lastIndexOf('/') + 1)) + $(obj).val().substr(parseInt($(obj).val().lastIndexOf('.')  + 1)) + ico.substr(parseInt(ico.lastIndexOf('.')));
         src = new Image();
         src.onload = function()
         {
            $(obj).parent('div.file').children('div.file_icon').css('background-image', ico);
         }
         src.onerror = function()
         {
            $(obj).parent('div.file').children('div.file_icon').removeAttr('style').removeClass().addClass('file_icon');
         }
         src.src = ico.substr(5, ico.length - 7);
      }
   }

/*----------------------------------------------------------------------------*/
   //Функции стилизации input:radio
   function form_radio(obj)
   {
      if(!$(obj).is(':radio'))
      {
         return;
      }

      $(obj).css('display', 'none').change(function()
      {
         form_radio_change(this);
      }).wrap("<div class='radio'></div>").parent('div.radio').prepend('<div></div>');
      form_radio_change(obj);
   }

   function form_radio_action(obj)
   {
      name = $(obj).parent('div.radio').children('input:radio').attr('name');
      $('input:radio:disabled[name = ' + name + ']').prop('checked', false).change();
      $('input:radio:enabled[name = ' + name + ']').prop('checked', false).change();
      $(obj).removeClass().addClass('radio_e1').parent('div.radio').children('input:radio').prop('checked', true);
   }

   function form_radio_change(obj)
   {
      name = $(obj).attr('name');
      $('input:radio:disabled[name = ' + name + ']').parent('div.radio').children('div').removeClass().addClass('radio_d0').unbind('click');
      $('input:radio:enabled[name = ' + name + ']').parent('div.radio').children('div').removeClass().addClass('radio_e0').unbind('click').bind('click', function()
      {
         form_radio_action(this);
      });

      $(obj).not(':enabled').parent('div.radio').children('div').removeClass().addClass('radio_d1');
      $(obj).not(':enabled, :checked').parent('div.radio').children('div').removeClass().addClass('radio_d0');
      $(obj).not(':disabled').parent('div.radio').children('div').removeClass().addClass('radio_e1');
      $(obj).not(':disabled, :checked').parent('div.radio').children('div').removeClass().addClass('radio_e0');
}

/*----------------------------------------------------------------------------*/
   //Функции стилизации select
   function form_select(obj)
   {
      if(!$(obj).is('select:not(.switch)'))
      {
         return;
      }

      $(obj).css('display', 'none').change(function()
      {
         form_select_change(this);
      }).wrap("<div class='select'></div>").parent('div.select').append("<div class='select_txt'></div><div class='select_btn'></div><div class='options'></div><ul class='options'></ul>");

      sel_w = $(obj).width()+10;
      $(obj).parent('div.select').width(sel_w);
      $(obj).parent('div.select').children('div.select_txt').width(sel_w - parseInt($('div.select_txt').css('padding-left').replace('px', '')) - parseInt($('div.select_txt').css('padding-right').replace('px', '')) - $('div.select_btn').width());
      $(obj).parent('div.select').children('ul.options').width(sel_w - parseInt($('ul.options').css('border-left-width').replace('px', '')) - parseInt($('ul.options').css('border-right-width').replace('px', '')));
      form_select_change(obj);
   }

   function form_select_change(obj)
   {
      if($(obj).is(':disabled'))
      {
         $(obj).parent('div.select').css('opacity', 0.5).unbind();
      }
      else
      {
         $(obj).parent('div.select').css('opacity', 1).unbind().click(function()
         {
            form_select_option_visual(this);
         }).hover(function()
         {
            $(this).children('div.select_txt').addClass('select_txt_hover');
            $(this).children('div.select_btn').addClass('select_btn_hover');
         }, function()
         {
            form_select_option_leave();
            $(this).children('div.select_txt').removeClass('select_txt_hover');
            $(this).children('div.select_btn').removeClass('select_btn_hover');
         });
      }

      options = '';
      $(obj).children('option').each(function()
      {
         if($(this).is(':selected'))
         {
            $(obj).parent('div.select').children('div.select_txt').html($(this).html());
            options += "<li data-value='" + $(this).val() + "' class='selected'>" + $(this).html() + "</li>";
         }
         else
         {
            options += "<li data-value='" + $(this).val() + "'>" + $(this).html() + "</li>";
         }
      });
      $(obj).parent('div.select').children('ul.options').html(options).children('li').click(function()
      {
         form_select_option_action(this);
      });
   }

   function form_select_option_leave()
   {
      $('ul.options:visible').animate({height : '0px'}, 50, 'linear', function()
      {
         $('div.options').css('display', 'none');
         $('ul.options').css('visibility', 'hidden');
      });
   }

   function form_select_option_action(obj)
   {
      $(obj).parent('ul.options').children('li').removeClass('selected').parent('ul.options').parent('div.select').children('div.select_txt').html($(obj).html());
      $(obj).addClass('selected').parent('ul.options').parent('div.select').children('select').val($(obj).attr('data-value'));
      $(obj).parent('ul.options').parent('div.select').children('select').change();
      form_select_option_leave();
   }

   function form_select_option_visual(obj)
   {
      if($(obj).children('ul.options').height() == 0)
      {
         form_select_option_leave();
         setTimeout(function()
         {
            $(obj).children('div.options').css('display', 'block');
            opt_h = $(obj).children('ul.options').css('height', 'auto').height();
            $(obj).children('ul.options').css({height : 0, visibility : 'visible'}).animate({height : opt_h + 'px'}, 100, 'linear');
         }, 100);
      }
      else
      {
         form_select_option_leave();
      }
   }

/*----------------------------------------------------------------------------*/
   //Функции стилизации select switch для выбора 0 или 1 (on - off, yes - no)
   function form_switch(obj)
   {
      if(!$(obj).is('select.switch'))
      {
         return;
      }

      $(obj).css('display', 'none').change(function()
      {
         form_switch_change(this);
      }).wrap("<div class='switch'></div>").parent('div.switch').prepend('<div></div><div></div>');
      form_switch_change(obj);
   }

   function form_switch_action(obj)
   {
      val = $(obj).index();
      $(obj).parent('div.switch').removeClass('switch_0 switch_1').addClass('switch_' + val).children('div').removeClass().unbind().eq(val).addClass('switch_btn').click(function()
      {
         form_switch_action(this);
      });
      $(obj).parent('div.switch').children('select').val($(obj).parent('div.switch').children('select').children('option').eq(1 - val).val()).change();
   }

   function form_switch_change(obj)
   {
      val = $(obj).children('option:selected').index();
      if($(obj).prop('disabled'))
      {
         $(obj).parent('div.switch').css('opacity', 0.5).removeClass('switch_0 switch_1').addClass('switch_' + val).children('div').removeClass().unbind().eq(val).addClass('switch_btn');
      }
      else
      {
         $(obj).parent('div.switch').css('opacity', 1).removeClass('switch_0 switch_1').addClass('switch_' + val).children('div').removeClass().unbind().eq(val).addClass('switch_btn').click(function()
         {
            form_switch_action(this);
         });
      }
   }

/*----------------------------------------------------------------------------*/
   $.fn.form_style = function(param)
   {
      if(method[param])
      {
         return method[param].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else if(typeof param === 'object' || !param)
      {
         return method.init.apply(this, arguments);
      }
      else
      {
         $.error('Метод не найден!');
      }
   }
})(jQuery);

/*----------------------------------------------------------------------------*/
//-->