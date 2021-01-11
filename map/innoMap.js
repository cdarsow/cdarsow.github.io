var $innomap = $("#innoMap"),
    $preview = $("#innoPreview");

// show preview of active map area
var innoPreview = function(index) {
    var content = landkarte.content[index];

    $preview.find("h2").html(content.title);
    $preview.find("p").html(content.description);
    $preview.find("a").attr("href", content.link);
    $preview.find("a").show();
};

// add all active areas to image map
var drawMapContent = function(item, index) {
    var style = "top: " + item.coordinates.y + "px; left: " + item.coordinates.x + "px; width: " + item.width + "px; height: " + item.height + "px; padding-top: " + item.paddingTop + "px; padding-left: " + item.paddingLeft + "px; text-align: " + item.align + ";";
    $innomap.append('<a id="innoMapLink' + index + '" class="innoMapLink" href="#" onclick="innoPreview(' + index + '); return false;" title="' + item.title + '" style="' + style + '"></a>');

    if (item.bgImage) {
        var styleSheet = document.createElement( 'STYLE' ) ;
        styleSheet.innerHTML += '#innoMapLink' + index + ':hover { background-position: -' + item.coordinates.x + 'px -' + item.coordinates.y + 'px ; }';
        document.body.appendChild( styleSheet ) ;
    }

    // add circle
    if (item.dot) {
        $("#innoMapLink" + index).append('<svg height="12" width="12"><circle cx="6" cy="6" r="6" class="innoCircle" /></svg>');
    }

    $("#innoMapLink" + index).append('<div>' + item.titleShort + '</div>');
};

$(document).ready(function () {
    landkarte.content.forEach(drawMapContent);
});