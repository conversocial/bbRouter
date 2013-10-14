define([
    'wire',
    'backbone'
],
function(wire, Backbone){

    var spy1 = jasmine.createSpy('route 1'),
        spy2 = jasmine.createSpy('route 2');        

    define('mock1', function() {
        var fn = function(){};
        fn.prototype.init = spy1
        return fn;
    });

    define('mock2', function() {
        var fn = function(){};
        fn.prototype.init = function(){
            spy2(this.vars)
        };
        return fn;
    });

    define('route1', function() {
        var spec = {
            someComponent: {
                create: {
                    module: 'mock1'
                },
                ready: 'init'
            }
        }
        return spec;    
    });

    define('route2', function() {
        var spec = {
            someComponent: {
                create: {
                    module: 'mock2'
                },
                properties: {
                    vars: {
                        $ref: 'vars'
                    }
                },
                ready: 'init'
            }
        }
        return spec;
    });

    var CustomRoute = Backbone.Router.extend({
        feck: 'gello'
    });

    define('secondRoute', function() {
        return CustomRoute;
    });

    var routerSpec = {
        testRouter: {
            bbRouter: {
                routes: {
                    '':  'route1',
                    'test/:id/:sad': 'route2'
                }
            }
        },
        testRouter2: {
            bbRouter: {
                routerModule: 'secondRoute'
            }
        },
        plugins: ['www/js/components/bbrouter/module']
    }

    beforeEach(function () {
        this.addMatchers({
            toBeInstanceOf : function (constructr) {
                return this.actual instanceof constructr;
            }
        });
    });

    wire(routerSpec).then(function(context) {
        describe("bbRouter test suite", function() {
            it("instantiate default router", function() {
                expect(context.testRouter).toBeInstanceOf(Backbone.Router);
                expect(spy1).toHaveBeenCalled();
            });
            it("instantiate default router", function() {
                runs(function(){
                    context.testRouter.navigate('test/1/2', {trigger: true});
                });
                waits(0);
                runs(function(){
                    expect(spy2).toHaveBeenCalledWith({'id': '1', 'sad': '2'});
                })
            });
            it('instantiate a custom router', function() {
                expect(context.testRouter2).toBeInstanceOf(CustomRoute);
            });
        });
    }, function(error) {
        console.log('error', error.stack);
    });
});