$(document).ready(() => {
    canvas.remove()
});

$('#rules').keyup(() => {
	let input = $('#rules').val()
	let parsed = parse(input)
	if (parsed == null)
		$("#error").css("display", "block");
	else {
        $("#error").css("display", "none");
        edges = parsed
    }
	canvas.remove()
	setup()
	draw()
})

function clean() {
	for (v in vertices) {
		o = vertices[v];
		o.label.hide()
	}
	edges = [];
	vertices = {};
	groups = [];
	updateConstants();
	build();
}
