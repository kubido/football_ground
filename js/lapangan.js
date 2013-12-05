$(document).ready(function(){
  initGround();
  clickableBox();
  hoverable();
  $( "ul#list" ).sortable({
    update: function(e, ui){
      reInitializePosititionNumber();
    }
  });
})

function initGround(){
  vertical = ["va", "vb", "vc", "vd", "ve", "vf", "vg", "vh", "vi", "vj", "vk", "vl", "vm", "vn", "vo", "vp", "vq", "vr", "vs", "vt", "vu", "vv", "vw", "vx", "vy", "vz"]
  horizontal = ["ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz"]
  loopGrid(vertical, "v")
  loopGrid(horizontal, "h")
};

function loopGrid(arr, kind){
  clear  = '<div style="clear:both">'
  $.each(arr, function(idx, coor){
    $.each(arr, function(vertical_idx, coor){
      if(kind=="v"){
        index = idx+1
      }else{
        index = Math.abs(idx-26)
      }
      id  = arr[vertical_idx] +'-'+ index
      box = '<div class="box" id="'+id+'">'
      $('.half_ground.'+kind+'').append(box)
    })
  })
};

function clickableBox(){
  $('.box').on('click',function(){
    active_box = $('.box.active').length + 1
    id = $(this).attr('id')
    if(active_box <= 12){
      if($(this).hasClass('active')){
        $('li.'+id).remove();
        $(this).removeClass('active').children().remove()
      }else if(active_box <= 11){      
        $('#list').append('<li class='+id+'>('+ active_box+') '+ id+'</li>')
        $(this).addClass('active').append('<div>'+ active_box +'</div>')
        hoverable()      
      }
      reInitializePosititionNumber()  
    }
    
  })
};

function hoverable(){
  $('ul#list li').on('mouseenter', function(){
    class_id = $(this).attr('class')
    $('.box#'+class_id).addClass('hovered')
  }).on('mouseleave',function(){
    class_id = $(this).attr('class')
    $('.box#'+class_id).removeClass('hovered')    
  })

  $('.box').on('mouseenter', function(){
    $('span#coordinat').text($(this).attr('id'))
  }).on('mouseleave', function(){
    $('span#coordinat').text('X,Y')
  })
}

function reInitializePosititionNumber(){
  $.each($('ul#list li'), function(i, elem){
    class_id = $(this).attr('class')
    index    = i+1
    new_text = $(elem).text().replace(/[0-9]+/, index)
    $(elem).text(new_text)
    $('.box#'+class_id+' div').text(index)
  })
}

function toYaml(){
  if ($('.box.active').length <= 11){
    arr=[];
    $.each($('ul#list li'),function(index, elem){
      text = $(elem).text().split(" ")[1]
      arr.push((index+1)+': '+ text.replace('-', ','))
    })
    alert(arr.join('\n'))
  }else{
    alert('please input more player position, minimum 11')
  }
}

function clearActive(){
  $('.box.active').click()
}

function templateFromArray(arr){
  clearActive();
  $.each(arr,function(i,e){
    $('#'+e).click()
  })
}

