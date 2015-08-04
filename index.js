'use strict';
/**
 * MixedArgs
 * https://github.com/albulescu/mixedargs
 *
 * Author Albulescu Cosmin <cosmin@albulescu.ro>
 * Licensed under the MIT license.
 */
(function(){

    var isType = function(value, type) {
        return Object.prototype.toString.call(value) === '[object '+type+']';
    };

    var MixedArgs = function( args ){
        this.arguments = args;
        this.cases = [];
        this.matched = false;
        this.queued = [];
    };

    MixedArgs.prototype = {

        get: function( index ) {

            if( typeof(this.arguments[index]) === 'undefined' ) {
                throw new Error('Only ' + this.arguments.length + ' are available');
            }

            return this.arguments[index];
        },

        when: function(mixed, callback) {

            var uid = mixed.join('-');

            if( this.queued.indexOf(uid) !== -1 ){
                throw new Error('You already registered mixed params: ' + mixed.join(', '));
            }

            this.queued.push(uid);

            if( this.matched || this.arguments.length !== mixed.length ) {
                return false;
            }

            var matchedCount = 0;
            var regExpAllowedTypes = ['String','Number'];
            var regExpMatch = new RegExp('([a-zA-Z]+)\\((.*)\\)');

            for( var i in mixed ) {

                var rule = mixed[i];
                var ruleRegexpMatch = regExpMatch.exec(rule);

                if( ruleRegexpMatch && ruleRegexpMatch.length === 3 ) {

                    if( regExpAllowedTypes.indexOf(ruleRegexpMatch[1]) === -1 ) {
                        throw new Error('Type ' + ruleRegexpMatch[1] + ' is not allowed. Use: ' + regExpAllowedTypes.join(', '));
                    }

                    if( isType(this.arguments[i], ruleRegexpMatch[1]) &&
                        (new RegExp(ruleRegexpMatch[2])).test(this.arguments[i] + '') ) {
                        matchedCount++;
                    }
                } else if(isType(this.arguments[i], rule)) {
                    matchedCount++;
                }
            }

            if( matchedCount === mixed.length ) {

                if( typeof(callback) === 'function' ) {
                    callback.apply(null, this.arguments);
                }

                this.matched = true;

                return true;
            }

            return false;
        }
    };

    if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
        module.exports = function( args ) {
            return new MixedArgs(args);
        };
    } else {
        window.mixedargs = function(args) {
            return new MixedArgs(args);
        };
    }
})();