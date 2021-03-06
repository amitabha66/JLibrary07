/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
/**
 * Tests Ext.data.Store functionality
 * @author Ed Spencer
 */
(function() {
    var suite  = Ext.test.session.getSuite('Ext.Direct'),
        assert = Y.Assert;

    //a shared setup function used by several of the suites
    var defaultSetup = function() {
        this.API = {
            "url": "php\/router.php",
            "type": "remoting",
            "actions": {
                "TestAction": [{
                    "name": "doEcho",
                    "len": 1
                }, {
                    "name": "multiply",
                    "len": 1
                }, {
                    "name": "getTree",
                    "len": 1
                }],
                "Profile": [{
                    "name": "getBasicInfo",
                    "len": 2
                }, {
                    "name": "getPhoneInfo",
                    "len": 1
                }, {
                    "name": "getLocationInfo",
                    "len": 1
                }, {
                    "name": "updateBasicInfo",
                    "len": 2,
                    "formHandler": true
                }]
            }
        };
    };

    suite.add(new Y.Test.Case({
        name: 'adding providers',

        setUp: defaultSetup,

        testAddProvider: function() {
            var p = Ext.Direct.addProvider(
                this.API
            );
            Y.ObjectAssert.hasKeys(p.actions, [
                "Profile",
                "TestAction"
            ], 'Test actions provided');
            Y.ObjectAssert.hasKeys(p.actions, p, Ext.Direct.providers, "Test providers cache");
        },
        testGetProvider: function() {
            var p = Ext.Direct.addProvider(
                this.API
            );
            Y.ObjectAssert.hasKeys(p, Ext.Direct.getProvider(p.id));
        },
        testRemoveProvider: function() {
            // Remove via id
            var p = Ext.Direct.addProvider(
                this.API
            );
            var id = p.id;
            Ext.Direct.removeProvider(id);
            Y.Assert.isUndefined(Ext.Direct.getProvider(id));

            // Remove via object
            var p = Ext.Direct.addProvider(
                this.API
            );
            var id = p.id;
            Ext.Direct.removeProvider(p);
            Y.Assert.isUndefined(Ext.Direct.getProvider(id));
        }
    }));
})();
