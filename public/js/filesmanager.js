$('.files-manager-item').bind('click', function() {
  if ( $(this).hasClass("active") ) {
    $(this).removeClass('active')
  } else {
    $('.files-manager-item').removeClass('active')
    $(this).addClass('active')
  }
}, false)

function selectItem( item ) {
  console.log('selectItem', item)
  if ( $('#'+ item).hasClass("active") ) {
    $('.files-manager-item').removeClass('active')
  } else {
    $('.files-manager-item').removeClass('active')
    $('#'+ item).addClass('active')
  }
}

function getItem( path ) {
  let posting = $.post( '/admin/filesManager/', { path: path }, ( response ) => { returnData( response, path ) }  );
}

function renameItem( event ) {
  console.log('renameItem', event)
}

function showDeleteModal( file, path ) {
  $( ".del-file" ).val( file )
  $( ".del-path" ).val( path )
  $( ".fm-delete-modale" ).show();
  $( ".fm-blackout" ).show();
}

function showRenameModal( file, path ) {
  $( ".rename-file" ).val( file )
  $( ".rename-old" ).val( file )
  $( ".rename-path" ).val( path )
  $( ".fm-rename-modale" ).show();
  $( ".fm-blackout" ).show();
}

function renameItem() {
  console.log( 'renameItem', $( ".rename-file" ).val(), $( ".rename-old" ).val(), $( ".rename-path" ).val() )
  let file = $( ".rename-file" ).val()
  let old =  $( ".rename-old" ).val()
  let path = $( ".rename-path" ).val() != '/' ? $( ".rename-path" ).val() : ''
  $( ".fm-rename-modale" ).hide();
  $( ".fm-blackout" ).hide();
  let posting = $.post( '/admin/filesManager/rename', { new:  path + '/' + file, old: path + '/' + old, path }, ( response ) => { returnData( response, path ) }  );
  $( ".rename-file" ).val( 'null' )
  $( ".rename-old" ).val( 'null' )
  $( ".rename-path" ).val( 'null' )
}

function delItem() {
  console.log( 'delItem', $( ".del-file" ).val(), $( ".del-path" ).val()  )
  let path = $( ".del-path" ).val()
  $( ".fm-delete-modale" ).hide();
  $( ".fm-blackout" ).hide();
  let posting = $.post( '/admin/filesManager/delete', { file: $( ".del-file" ).val(), path  }, ( response ) => { returnData( response, path ) }  );
  $( ".del-file" ).val( 'null' )
  $( ".del-path" ).val( 'null' )
}

function closeFMModale() {
  $( ".del-file" ).val( 'null' )
  $( ".del-path" ).val( 'null' )
  $( ".fm-delete-modale" ).hide();
  $( ".fm-blackout" ).hide();
}

function upload() {
  console.log('upload path html', $('.path span').html() )

  event.preventDefault();

  let url = '/admin/filesManager/upload'
  let path = $('.path span').html()
  console.log('upload path', path )
  $.ajax({
    url: url,
    type: 'POST',
    data: new FormData($('#upload-image-form')[0]),
    processData: false,
    contentType: false
  })
  .done( ( response ) => { returnData( response, path ) } )
  .fail( ( error ) => { console.log( "An error occurred, the files couldn't be sent!", error ) } )
}

function returnData( response, path ) {
  console.log('returnData response', response )
  console.log('returnData path', path )
  $( "#path" ).val( path || '/' )
  $( "#parrentDir" ).val( path || '/' )
  if (path == '') {
    path = '/'
  }
  $('.path').find( 'span' ).remove()
  $('.path').append('<span>' + path + '</span>')
  $('.files-manager-item').remove()
  if(path != "/") {
    $('.files-manager-block').prepend( `
      <div class='files-manager-item' onclick='getItem( "`+path.replace(/\/*[^\/]+$/g, '')+`" )'>
        <img src='/images/folderUp.png'>
        <p class='text-center'>Назад</p>
      </div>`)
  }
  if(path == "/") {
    $('.path').find( 'span' ).remove()
    $('.path').append( '<span>/</span>')
  }
  for ( index in response.files ) {
    let re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
    if (re.test( response.files[index] ) == true) {
      $('.files-manager-block').append( `
        <div class='files-manager-item'  id='`+ response.files[index].replace(/[^_a-zA-Z0-9-]*/g, '') +`' onclick="selectItem('` + response.files[index].replace(/[^_a-zA-Z0-9-]*/g, '') + `')">
          <img src='/images/file.png' ondblclick='showImg( "`+path+`/`+response.files[index]+`"  )' >
          <i class="fas fa-trash fm-del" onclick='showDeleteModal( "`+path+`/`+response.files[index]+`", "` + response.parrentDir + `" )'></i>
          <i class="fas fa-pen fm-rename" onclick='showRenameModal( "`+response.files[index]+`", "` + response.parrentDir + `" )'></i>
          <p class='text-center'>`+response.files[index]+`</p>
        </div>`)
    } else {
      $('.files-manager-block').append( `
        <div class='files-manager-item' id='`+ response.files[index] +`' onclick="selectItem('` + response.files[index] + `')">
          <img src='/images/folder.png' ondblclick='getItem( "`+response.parrentDir+`/`+response.files[index]+`" )'>
          <p class='text-center'>`+response.files[index]+`</p>
        </div>`)
    }
  }
}

function showImg( imgPath ) {
  $( ".zoom-block .big-image" ).attr( 'style', 'background-image: url("/uploads'+imgPath+'")' )
  $( ".zoom-block" ).removeClass('off')
}

window.addEventListener("load", function(event) {
  $( ".zoom-block" ).click(function() {
    $( ".zoom-block" ).addClass('off');
  });
})
