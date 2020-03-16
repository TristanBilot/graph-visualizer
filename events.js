$(document).ready(() => {
    $("#rules").html("")
    canvas.remove();
});

$( "#rules" ).on( "keydown", function( event ) {
    if (event.keyCode == 9) {
        $('#rules').val($('#rules').val() + '=>');
        event.preventDefault();
    }
});

$('#rules').keyup(() => {
	let input = $('#rules').val();
	let parsed = parse(input);
	if (parsed == null)
		$("#error").css("display", "block");
	else {
        $("#error").css("display", "none");
        edges = parsed;
    }
	updateCanvas();
})

$(".basic_input").keyup(() => {
    edgeSize = $('#input_edge').val() == "" ? const_edgeSize : parseInt($('#input_edge').val());
    spacing = $('#input_spacing').val() == "" ? const_spacing : parseInt($('#input_spacing').val());
    nbVertexPerLine = $('#input_vertex').val() == "" ? const_nbVertexPerLine : parseInt($('#input_vertex').val());
    strokeWidth = $('#input_stroke').val() == "" ? const_strokeWidth : parseInt($('#input_stroke').val());
    updateCanvas();
});


function updateCanvas() {
    canvas.remove();
	setup();
	draw();
}

function clean() {
	for (v in vertices) {
		o = vertices[v];
		o.label.hide();
	}
	edges = [];
	vertices = {};
	groups = [];
	updateConstants();
	build();
}
