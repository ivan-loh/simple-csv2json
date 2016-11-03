## Simple streaming csv -> json

no dependency parser

#### Sample

```
const transformer = load('./path-to/some-csv-file.csv');
      transformer.on('data', console.log);
      transformer.on('done', () => { console.log('done'); });
```
