$(document).ready(function () {


    $('#sortSelect').on('change', function() {
        let value = this.value ;

        if((value+"")=="0")
        {
            refresh();
        }
        else if((value+"")=="1")
        {
            loadMusicSortBy(1);

        }
        else if((value+"")=="2")
        {
            loadMusicSortBy(2);
        }
      });

    $("#btnUpdateMusicAudio").click(function () {

        let id = $(this).attr("data-id");


        if (id == '') {
            alert("Give Music Name");
        }
        else if ($('#music_path')[0].files.length == 0) {
            alert("Give Music File");
        }
        else {

            var data = new FormData();

            data.append("id", id);
            data.append("file", $('#music_path')[0].files[0]);


            jQuery.ajax({
                "async": true,
                "crossDomain": true,
                "url": window.location.origin + "/adminapi/updateNewMusicAudio",
                "type": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": data,
                "success": function (resp) {
                    var data = JSON.parse(resp);
                    if (data.isSuccess) {
                        refresh();
                    }
                    else {
                        console.log("" + data.message);
                    }
                }
            });
        }

    })

    $("#btnUpdateMusic").click(function () {

        let name = $.trim($("#name").val());
        let category = $.trim($("#category").val());
        let artist = $.trim($("#artist").val());
        let genre = $.trim($("#genre").val());

        if (name == '') {
            alert("Give Music Name");
        }
        else if (category == '') {
            alert("Give Music Category");
        }
        else if (artist == '') {
            alert("Give Music Artist");
        }
        else if (genre == '') {
            alert("Give Music Genre");
        }
        else {

            var data = {};
            data['id'] = $(this).attr("data-id");
            data['name'] = name;
            data['category'] = category;
            data['artist'] = artist;
            data['genre'] = genre;

            jQuery.ajax({
                "url": window.location.origin + "/adminapi/updateMusic",
                "type": "POST",
                "data": JSON.stringify(data),
                contentType: "application/json",
                "success": function (res) {
                    res = JSON.parse(res);
                    if (res.isSuccess) {
                        refresh();
                    } else {
                        alert("" + res.message);
                    }
                }
            });

        }

    })

    $("#listOfMusic").on("click", "#editMusic", function () {

        $("#name").val($(this).attr("data-name"));
        $("#category").val($(this).attr("data-category"));
        $("#artist").val($(this).attr("data-artist"));
        $("#genre").val($(this).attr("data-genre"));
        $("#btnUpdateMusic").attr("data-id", $(this).attr("data-id"));
        $("#music-detail-edit").modal("show");

    })

    $("#listOfMusic").on("click", "#editMusicAudio", function () {

        $("#btnUpdateMusicAudio").attr("data-id", $(this).attr("data-id"));
        $("#music-audio-edit").modal("show");

    })

    $("#listOfMusic").on("click", "#deletedBtn", function () {

        let id = $(this).attr("data-id");

        if (confirm("Are you sure to delete")) {
            var data = {};
            data['id'] = id;

            jQuery.ajax({
                "url": window.location.origin + "/adminapi/deleteMusic",
                "type": "POST",
                "data": JSON.stringify(data),
                contentType: "application/json",
                "success": function (res) {
                    res = JSON.parse(res);
                    if (res.isSuccess) {
                        refresh();
                    } else {
                        alert("" + res.message);
                    }
                }
            });
        }

    })


    function refresh() {
        paginationindex = 0;
        $("#listOfMusic").html("");
        loadMusic();
        $("#music-detail-edit").modal("hide");
        $("#music-audio-edit").modal("hide");
    }

    loadMusic();

})

var paginationindex = 0;

function loadMusic() {
    jQuery("#loadMoreTD").hide();
    jQuery("#loaderGifTD").show();
    let loadedValues = jQuery("#listOfMusic tr").length - paginationindex;
    let data = {
        "skip": loadedValues
    };
    jQuery.ajax({
        "url": window.location.origin + "/adminapi/listMusicPage",
        "type": "POST",
        "data": JSON.stringify(data),
        contentType: "application/json",
        "success": function (res) {
            res = JSON.parse(res);
            if (res.isSuccess) {
                paginationindex = paginationindex + 2;
                let responseData = res.response;
                let htmlText = "";
                for (var i = 0; i < responseData.length; i++) {

                    loadedValues = loadedValues + 1;

                    htmlText = `${htmlText}
                    <tr>
                    <td>${loadedValues}</td>
                     <td>
                     <audio id="playerTwo" class="player" controls="controls" preload="none">
 <source src="${responseData[i].music_path}" type="audio/mpeg"/>
</audio></td>
                     <td>${responseData[i].name}</td>
                     <td>${responseData[i].category}</td>
                     <td>${responseData[i].artist}</td>
                     <td>${responseData[i].genre}</td>
                     <td><a href="#" id="editMusic" 
                     data-id="${responseData[i].id}"
                     data-name="${responseData[i].name}"
                     data-category="${responseData[i].category}"
                     data-artist="${responseData[i].artist}"
                     data-genre="${responseData[i].genre}" ><span class="right badge badge-info">Edit Detail</span></a>
                     
                     <a href="#" id="editMusicAudio"
                     data-id="${responseData[i].id}"
                     >
                     <span class="right badge badge-success">
                     Change Music File
                     </span/>
                     </a>

                     </td>
                     <td><a data-id="${responseData[i].id}" id="deletedBtn" ><span class="right badge badge-danger">Delete</span></a></td>
                    `;


                }
                htmlText += '<tr><td id="loadMoreTD" colspan="9"><button id="loadMoreBtn" class="btn btn-block" onclick="loadMusic()" style="width:100%; float:right; background-color:blue; color:white;"><b> Load More Music</b></button></td></tr><tr><td id="loaderGifTD" colspan="9" style="display:none;"><center><img id="loaderGIF" src="../img/loader.gif" height="50px" width="50px"/></center></td></tr>';
                jQuery("#loaderGifTD").remove();
                jQuery("#loadMoreTD").remove();
                $('#listOfMusic:last-child').append(htmlText);

            } else {
                alert("" + res.message);
            }
        }
    });
}


function loadMusicSortBy(sortId) {
   
     let data = {
        "sortId": sortId
    };
    jQuery.ajax({
        "url": window.location.origin + "/adminapi/listMusicPageSort",
        "type": "POST",
        "data": JSON.stringify(data),
        contentType: "application/json",
        "success": function (res) {
            res = JSON.parse(res);
            if (res.isSuccess) {
                 let responseData = res.response;
                let htmlText = "";
                for (var i = 0; i < responseData.length; i++) {

 
                    htmlText = `${htmlText}
                    <tr>
                    <td>${i+1}</td>
                     <td>
                     <audio id="playerTwo" class="player" controls="controls" preload="none">
 <source src="${responseData[i].music_path}" type="audio/mpeg"/>
</audio></td>
                     <td>${responseData[i].name}</td>
                     <td>${responseData[i].category}</td>
                     <td>${responseData[i].artist}</td>
                     <td>${responseData[i].genre}</td>
                     <td><a href="#" id="editMusic" 
                     data-id="${responseData[i].id}"
                     data-name="${responseData[i].name}"
                     data-category="${responseData[i].category}"
                     data-artist="${responseData[i].artist}"
                     data-genre="${responseData[i].genre}" ><span class="right badge badge-info">Edit Detail</span></a>
                     
                     <a href="#" id="editMusicAudio"
                     data-id="${responseData[i].id}"
                     >
                     <span class="right badge badge-success">
                     Change Music File
                     </span/>
                     </a>

                     </td>
                     <td><a data-id="${responseData[i].id}" id="deletedBtn" ><span class="right badge badge-danger">Delete</span></a></td>
                    `;


                }
                  
                $('#listOfMusic').html(htmlText);

            } else {
                alert("" + res.message);
            }
        }
    });
}