function parse(input) {
	var rules = [];
	var t = input.split('\n');
	for (let i = 0; i < t.length; i++) {
		let rule = t[i];
		let splitted = rule.split("=>");
		if (splitted.length != 2 ||
			splitted[0] === "" || splitted[1] === "") {
				throwError();
				return null;
			}
		rules.push([splitted[0].trim(), splitted[1].trim()]);
	}
	return rules;
}

function throwError() {
	
}
