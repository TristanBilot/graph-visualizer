function parse(input) {
	var rules = [];
	var t = input.split('\n');
	for (let i = 0; i < t.length; i++) {
		let rule = t[i];
		if (rule.trim() === "") {
			clean();
			continue;
		}
		let s = rule.split("=>");
		if (s.length != 2 || s[0] === "" || s[1] === "") {
			if (s[0] != "" && s[0][s[0].length-1] != '=')
				rules.push([s[0].trim(), s[0].trim()]);
			else
				return throwError();
		}
		else
			rules.push([s[0].trim(), s[1].trim()]);
	}
	if (rules.length == 0 && input.trim() != "" && input.trim() != '\n')
		rules.push([input.trim(), input.trim()]);
	return rules;
}

function throwError() {
	console.log("error");
	return null;
}
