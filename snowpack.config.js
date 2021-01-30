module.exports = {
	devOptions: {
		open: 'none'
	},
	mount: {
		// it means what urls map to files inside public directory
		public: '/',
		// it means what urls should be considered to serve files inside src direcotry. So when we say src: '/dist', it means a url like '/dist/blah.js', should be served the src/blah.js file. The src/blah.js file is first built
		// by snowpack and put inside the build folder. snowpack dev server knows that src/blah.js is built and kept somewhere inside build folder and it
		// has to serve that file. It also mirrors the url path we specify here as directories inside build folder. Probably makes it easier for it to map 
		// the urls to directly directories inside build folder. But it's
		// not necessarily so. That part confused me a lot. I thought the src: '/dist' was telling snowpack to build files and put inside a /dist folder
		src: "/dist"
	}
}
