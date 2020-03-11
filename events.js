$('#rules').keyup(() => {
	let input = $('#rules').val()
	let parsed = parse(input)
	if (parsed == null)
		return

	clean()
	edges = parsed
	canvas.remove()
	setup()
	draw()
});

function clean() {
	edges = [];
	vertices = {};
	groups = [];
	updateConstants();
	build();
}
