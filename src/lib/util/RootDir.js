/**
 * # The MIT License (MIT)
 *
 * Copyright © `2018-2020` `The Sapphire Project and its contributors`
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// NOTE: THIS IS THE CODE AS OUTPUT BY THE TYPESCRIPT COMPILER IN SAPPHIRE PROJECT
// HENCE THE USE OF "STRANGE" VARIABLE NAMES
// FOR THE PROPER SOURCE CODE SEE https://github.com/sapphire-project/framework/blob/main/src/lib/utils/RootDir.ts
const fs = require('fs');
const path = require('path');
function getProcessMainModule() {
	let _a;
	return (_a = Reflect.get(process, 'mainModule')) === null || _a === void 0 ? void 0 : _a.path;
}
function getRequireMain() {
	let _a;
	return (_a = require.main) === null || _a === void 0 ? void 0 : _a.path;
}
function getPackageMain() {
	const cwd = process.cwd();
	try {
		const file = fs.readFileSync(path.join(cwd, 'package.json'), 'utf8');
		return path.dirname(path.join(cwd, JSON.parse(file).main));
	} catch {
		return undefined;
	}
}
function getProcessCwd() {
	return process.cwd();
}
let resolvedPath = null;
function getRootDirectory() {
	let _a;
	let _b;
	let _c;
	if (resolvedPath === null)
		resolvedPath =
			(_c =
				(_b = (_a = getProcessMainModule()) !== null && _a !== void 0 ? _a : getRequireMain()) !== null && _b !== void 0
					? _b
					: getPackageMain()) !== null && _c !== void 0
				? _c
				: getProcessCwd();
	return resolvedPath;
}

module.exports = getRootDirectory;
