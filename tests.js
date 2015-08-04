var fnargs = require('./index.js');

exports.nodeunit = {

    itShouldWorkSync: function(test) {

        var func = function() {

            var args = fnargs(arguments);

            if( args.when(['Number', 'Number'])) {
                return args.get(0) + args.get(1);
            }

            if( args.when(['Number', 'String']) ) {
                return 'Jhon has ' + args.get(0) + ' ' + args.get(1);
            }

            return -1;
        };

        test.equal( func(1,1), 2 );
        test.equal( func(2,'children'), 'Jhon has 2 children' );
        test.equal( func(2,'2'), 'Jhon has 2 2');

        test.done();
    },

    itShouldWorkWithRegexp: function(test) {

        var func = function() {

            var args = fnargs(arguments);

            if( args.when(['Number([0-9]{3,})']) ) {
                return 1;
            }

            if( args.when(['Number([0-9]+)', 'String([0-9]+)']) ) {
                return 2;
            }

            return -1;
        };

        test.equal(func(111), 1, 'Should allow three numbers');
        test.equal(func(1,'1'), 2, 'Should allow a number and a string as a number');

        test.equal(func(1), -1, 'Should not allow a number with length 1');

        test.done();
    },

    itShouldThrowErrorOnUnavailableRegexpType: function(test) {

        var func = function() {
            var args = fnargs(arguments);
            args.when(['Boolean([0-9]{3,})']);
        };

        test.throws(function(){
            func(1);
        });

        test.done();
    },

    itShouldWorkAsync: function(test) {
        var output = '';

        var func = function() {

            var args = fnargs(arguments);

            args.when(['Number'], function(number){
                output='First number parameter';
            });

            args.when(['Number', 'String'], function(number){
                output='First number parameter and string for second';
            });
        };

        func(1);
        test.equal(output, 'First number parameter');

        func(1,'1');
        test.equal(output, 'First number parameter and string for second');

        test.done();
    },

    itShouldThrowOnMixedTwice: function(test) {
        var func = function() {

            var args = fnargs(arguments);

            args.when(['Number'], function(number){});

            args.when(['Number'], function(number){});
        };

        test.throws(func);
        test.done();
    },

    itShouldGetRequestedParameter: function(test) {
        var func = function() {
            var args = fnargs(arguments);
            return args.get(0);
        };

        test.ok(func(123) === 123);
        test.done();
    },

    itShouldThrowOnInvalidParamGet: function(test) {
        var func = function() {
            var args = fnargs(arguments);
            args.get(0);
        };

        test.throws(func);
        test.done();
    }
}