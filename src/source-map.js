const { SourceMapConsumer } = require('source-map')

const rawSourceMap = {
  "version": "3",
  "sources": [
      "../test/App.js"
  ],
  "names": [
      "styled",
      "React",
      "ReactDOM",
      "Title",
      "App",
      "render",
      "document",
      "getElementById"
  ],
  "mappings": "AAAA,SAASA,MAAT,QAAuB,eAAvB;AACA,OAAOC,KAAP,MAAkB,OAAlB;AACA,OAAOC,QAAP,MAAqB,WAArB;AAEA,MAAMC,KAAK;AAAA;AAAA;AAAA,EAAX;;AAMA,MAAMC,GAAG,GAAG,MAAM,CAAC,KAAD,CAAO,YAAY,EAAE,KAAF,CAArC;;AAEAF,QAAQ,CAACG,MAAT,CAAgB,CAAC,GAAD,GAAhB,EAAyBC,QAAQ,CAACC,cAAT,CAAwB,MAAxB,CAAzB",
  "sourcesContent": [
      "import { styled } from \"linaria/react\";\nimport React from \"react\";\nimport ReactDOM from \"react-dom\";\n\nconst Title = styled.h1`\n  font-family: sans-serif;\n  font-size: 48px;\n  color: red;\n`;\n\nconst App = () => <Title>Hello world!</Title>;\n\nReactDOM.render(<App />, document.getElementById(\"root\"));\n"
  ]
};

// const rawSourceMap = {
//   version: 3,
//   file: "min.js",
//   names: ["bar", "baz", "n"],
//   sources: ["one.js", "two.js"],
//   sourceRoot: "http://example.com/www/js/",
//   mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
// };

SourceMapConsumer.with(rawSourceMap, null, consumer => {
  console.log(consumer.sources);
  // [ 'http://example.com/www/js/one.js',
  //   'http://example.com/www/js/two.js' ]

  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 28
    })
  );
  // { source: 'http://example.com/www/js/two.js',
  //   line: 2,
  //   column: 10,
  //   name: 'n' }

  // console.log(
  //   consumer.generatedPositionFor({
  //     source: "http://example.com/www/js/two.js",
  //     line: 2,
  //     column: 10
  //   })
  // );
  // { line: 2, column: 28 }

  // consumer.eachMapping(function(m) {
  //   // ...
  // });

  // return computeWhatever();
});
