/**
 * angular-template-cache-resolver is a interceptor of $http service,
 * which solve the cache issue from CDN or server.
 *
 * The thing is, sometimes the front-end resource were stored on a static resource server,
 * on which you don't have good configuration for providing ETag or some other cache-control
 * stuff. After an upgrade, the static server serve the previous version of templates since
 * she has no idea about the changes.
 *
 * From front-end's perspective, the problem is easy to solve. A unique hash generated each time
 * while application launched, and append this hash as a search parameter to the template request
 *
 * @author Howard.Zuo
 * @date   Feb 9th, 2015
 *
 **/
(function(angular) {
    'use strict';

    var definition = function() {

        var mod = angular.module('angular-template-cache-resolver', []);

        var endwith = function(src, what) {
            if (!src) {
                return;
            }
            return src.indexOf(what, src.length - what.length) !== -1;
        };

        var contains = function(src, what) {
            if (!src) {
                return;
            }
            return src.indexOf(what) > -1;
        };

        var cacheResolverFactory = function(cacheId, endwithTxt, containsTxt) {
            return {
                'request': function(config) {

                    if (!endwithTxt && !containsTxt) {
                        return config;
                    }

                    if (endwithTxt) {
                        if (endwith(config.url, endwithTxt)) {
                            if (!config.params) {
                                config.params = {};
                            }
                            config.params.nocache = cacheId;
                            return config;
                        }
                    }

                    if (containsTxt) {
                        if (contains(config.url, containsTxt)) {
                            if (!config.params) {
                                config.params = {};
                            }
                            config.params.nocache = cacheId;
                            return config;
                        }
                    }

                    return config;
                }
            };
        };

        mod.provider('cacheResolver', [function() {
            var endwithTxt, containsTxt;
            var cacheId = new Date().getTime();

            this.setEndswith = function(value) {
                endwithTxt = value;
            };

            this.setContains = function(value) {
                containsTxt = value;
            };

            this.$get = [function() {
                return cacheResolverFactory(cacheId, endwithTxt, containsTxt);
            }];
        }]);

        mod.config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('cacheResolver');
        }]);

    };

    if (typeof exports === 'object') {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define([], definition);
    } else {
        definition();
    }

}(angular));
