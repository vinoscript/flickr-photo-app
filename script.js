console.log("script.js loaded")

$(function(){

  var apiKey = '682a9dc6aa4b35225b33fe2eee02f0c1';
  var flickr = 'https://api.flickr.com/services/rest/';
  var $photobox = $('#wrap');
  var flickrData = {  method      :   'flickr.photos.search',
                      format      :   'json',
                      api_key     :   apiKey,
                      tags        :   'cinqueterre',
                      sort        :   'relevance',
                      safe_search :   1             }                                          

  function hitFlickr(url, data){
    $.ajax({
      type: 'GET', // note this is implied if left blank
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      data: data,
      success: function(photos){
        photos.photos.photo.forEach(addPhoto);
      },
      error: function(){
        alert('Error loading photos');
      }
    });
  }

  function addPhoto(photo){
    var imageUrl = "https://farm" + photo.farm + ".staticflickr.com/" 
        imageUrl += photo.server + "/" + photo.id + "_" + photo.secret + "_q.jpg";

    var divBox = $('<div>').addClass('box');
    var divInnerBox = $('<div>').addClass('boxInner');
    var imageBox = $('<img>').attr('src', imageUrl);
    var titleBox = $('<div>').addClass('titleBox');

    var template = "<div class='box'>";
        template += "<div class='boxInner'>";
        template += "<img src='" + imageUrl + "'/>";
        template += "<div class='titleBox'>" + photo.title + "</div>";
        template += "</div>";
        template += "</div>";

    $photobox.append(template);
  }

  hitFlickr(flickr, flickrData);

  // Code below is for image effects //


});

