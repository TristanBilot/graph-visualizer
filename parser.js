function parse(input) {
	var rules = [];
	var s = input.split("=>");
	for (let i = 0; i < s.length - 1; i++) {
		if (s[i] == null || s[i + 1] == null || s[i].trim() == "" || s[i+1].trim() == "") { throwError(); return; }
		s[i]   = s[i].trim();
		s[i+1] = s[i+1].trim();
		
		rules.push([s[i], s[i + 1]]);
	}
	return rules;
}

function throwError() {

}