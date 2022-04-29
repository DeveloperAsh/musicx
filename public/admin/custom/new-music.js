$(document).ready(function () {

    

    $("#btnAddMusic").click(function(){

          let name = $.trim($("#name").val());
          let category = $.trim($("#category").val());
          let artist = $.trim($("#artist").val());
          let genre = $.trim($("#genre").val());
 
         if(name == '')
         {
             alert("Give Music Name");
         }
         else if(category == '')
         {
             alert("Give Music Category");
         }
         else if(artist == '')
         {
             alert("Give Music Artist");
         }
         else if(genre == '')
         {
             alert("Give Music Genre");
         }
         else if($('#music_path')[0].files.length == 0)
         {
             alert("Give Music File");
         }
         else
         {

            var data = new FormData();
            
            data.append("name" , name);
            data.append("category" , category);
            data.append("artist" , artist);
            data.append("genre" , genre);
            data.append("file", $('#music_path')[0].files[0]);

            jQuery.ajax({
                "async": true,
                "crossDomain": true,
                "url": window.location.origin + "/adminapi/addNewMusic",
                "type": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": data,
                "success": function (resp) {
                    var data = JSON.parse(resp);
                    if (data.isSuccess) {
                        window.location.replace(`music-list`);     
                    }
                    else {
                        console.log("" + data.message);
                    }
                }
            });

          
         }

    })

    

 

})