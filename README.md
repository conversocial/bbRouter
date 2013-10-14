bbRouter
========

A Wire (https://github.com/cujojs/wire) plugin for Backbone routing.

Simply define an empty component and assign the plugin (bbRouter).
Each route defined within the "routes" object is assigned a spec, 
which will be instantiated if/when the user browse to that route

bbrouter will use a default backbone router, to use your own class 
simply define a routerModule which points to the directory of your own router


Sample use
==========
router:
    bbRouter: 
        routes:            
            '':  'directory/of/spec1'
            'archive': 'directory/of/spec2'
            'email/:id': 'directory/of/spec3'
        routerModule: 'directory/of/custom/route/'

A basic set of (jasmine) unit tests is included
