Cache Breaking Tasks


###Usage

```js
var cacheBreaker = require("cache-breaker");

var string   = '<link href="/style.css" /><link href="/style2.css" />';

cacheBreaker.breakCache(string, ['style.css', 'style2.css']);

```

### Output
```html
<link href="/style.css?rel=23452341" /><link href="/style2.css?rel=23452341" />
```