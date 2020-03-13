$(document).ready(() => {
    canvas.remove()
});

$('#rules').keyup(() => {
	let input = $('#rules').val()
	let parsed = parse(input)
	if (parsed == null) {
		document.getElementById("error").style.display = "block";
		return
	}

	document.getElementById("error").style.display = "none";
	clean()
	edges = parsed
	canvas.remove()
	setup()
	draw()
})

function clean() {
	edges = [];
	vertices = {};
	groups = [];
	updateConstants();
	build();
}
