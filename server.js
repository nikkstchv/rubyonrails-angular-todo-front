function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const cors = require('cors');
const app = express();

app.use(requireHTTPS);
app.use(cors());
app.use(express.static('./dist/my-app'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/my-app/'});
});

app.listen(process.env.PORT || 8080);
