/**
 * Client-side script builder
 */
var fs = require('fs');

// tools
var browserify = require("browserify");
var jsmin = require('jsmin').jsmin;

exports.build = function() {
	console.log("Client-side script builder");

	// args
	var DEBUG = false;
	var infile = "./public/js/main.js";
	var outfile = "./public/js/bundle.js";
	var args = Array.prototype.slice.call(process.argv, 2);
	while (args.length > 0) {
		var argv = args.shift();
		switch (argv) {
		case '-debug':
			DEBUG = true;
			console.log("DEBUG Build")
			break;
		case '-infile':
			if(args.length <= 0) console.log("please specify the infile : -infile example.js");
			infile = args.shift();
			break;
		case '-outfile':
			if(args.length <= 0) console.log("please specify the outfile : -outfile export.js");
			outfile = args.shift();
			break;
		}
	}

	bundle = browserify(infile, {
		watch : DEBUG
	});

	function write() {
		// jsmin(text, options.level, options.comment)
		// var src = jsmin(bundle.bundle() , 2);
		var src;
		if (DEBUG) {
			src = bundle.bundle();
		} else {
			src = jsmin(bundle.bundle());
		}

		if (!bundle.ok)
			return;

		fs.writeFile(outfile, src, function() {
			console.log(Buffer(src).length + ' bytes written');
		});
	}

	write();

	// if (DEBUG)
	if (DEBUG)
		bundle.on('bundle', write);
};

exports.build();