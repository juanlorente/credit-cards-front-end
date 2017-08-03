import express from 'express';
import webpack from 'webpack';
import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';
import config from '../config/webpack.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);

// This is needed to serve correct html file with injected
// js and css references for requests to non default(/) urls
app.use(historyApiFallback({
  verbose: false
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
