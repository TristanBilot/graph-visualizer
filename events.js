
$('#rules').keypress(() => {
	let input = $('#rules').val()
	console.log(parse(input))
	edges = parse(input)
	resizeCanvas(calcCanvasWidth(), calcCanvasHeight());
	style();
    build();
	draw()
});
