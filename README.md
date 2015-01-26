# angular-template-cache-resolver  ![](http://img.shields.io/badge/bower_module-v1.0.0-green.svg) #
==================

 `angular-template-cache-resolver` is a interceptor of $http service, which solve the cache issue from CDN or server.
 
 The thing is, sometimes the front-end resources are stored on a static resource server, on which you don't have good configuration for providing ETag or other cache-control stuff. After an upgrade, the static server serve the previous version of templates since she has no idea about the changes.

 From front-end's perspective, the problem is easy to solve. A unique hash generated each time while application launched, and append this hash as a search parameter to the template request. During the application lifecycle, template is cached by `angular`, you dont' have to worry about the network traffic caused by `angular-template-cache-resolver`. She only fetch the correct template one time in application's lifecycle.


 ## Requirement ##

- [angular][angular-url]


## Install ##

```powershell
bower install --save angular-template-cache-resolver
```

## Usage ##

```html
<script type="text/javascript" src="bower_components/angular-template-cache-resolver/angular-template-cache-resolver.min.js"></script>
```

```javascript
var demo = angular.module('demo', ['angular-template-cache-resolver']);

//this config is used to define what URL is template request
demo.config(['cacheResolverProvider',
    function(cacheResolverProvider) {
        cacheResolverProvider.setEndswith('html');
    }
]);
```

## API ##

### cacheResolverProvider ###

#### setEndswith(postfix) ####

* `postfix` - used to determine if the URL is endwith this `postfix`. If yes, the request is a template request, otherwise not.

#### setContains(containsStr) ####

* `containsStr` - used to determine if the URL include this `containsStr`. If yes, the request is a template request, otherwise not.

> You can set both of those two methods, and the priority is `postfix` > `containsStr`


[angular-url]: https://angularjs.org/

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-template-cache-resolver/master/LICENSE)