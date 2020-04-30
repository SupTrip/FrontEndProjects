var  Module = require("module");

function exec(code, filename) {
  var module = new Module(filename, this);
  module.paths = Module._nodeModulePaths(this.context);
  module.filename = filename;
  module._compile(code, filename);
  return module.exports;
}

module.exports = function(source) {
	this.cacheable && this.cacheable();

  var result = exec.call(this, source, this.resourcePath);

	return JSON.stringify(result.default || result);
}
