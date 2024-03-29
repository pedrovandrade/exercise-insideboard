import React from 'react';

export default function Layout(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link rel='icon' href='/images/icon.png' />
        <link rel='stylesheet' href='/style/master.css' />
        <title>{props.title}</title>
      </head>
      <body>
        <div id='root'></div>
        <script src='/main.js'></script>
      </body>
    </html>
  );
}
