const fs = require("fs");

const browserConfig = {
  callbacks: {
    ready: function(err, browserSync) {
      const content_404 = fs.readFileSync('_site/404.html');

      browserSync.addMiddleware("*", (req, res) => {
        // Provides the 404 content without redirect.
        res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
        res.write(content_404);
        res.end();
      });
    },
  },
  ui: false,
  ghostMode: false
};

module.exports = browserConfig;
