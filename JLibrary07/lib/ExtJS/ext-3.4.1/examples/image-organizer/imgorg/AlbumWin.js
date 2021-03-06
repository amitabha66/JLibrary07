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
Imgorg.AlbumWin = Ext.extend(Ext.Window, {
    title: 'Choose Album',
    layout: 'fit',
    closeAction: 'hide',
    width: 300,
    modal: true,
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                autoHeight: true,
                xtype: 'form',
                id: 'album-select',
                bodyStyle: 'padding:15px',
                labelWidth: 50,
                items: [{
                    anchor: '95%',
                    fieldLabel: 'Album',
                    xtype: 'img-albumcombo',
                    name: 'album',
                    allowBlank: false
                }]
            }],
            buttons: [{
                text: 'Add to Album',
                handler: this.addToAlbum,
                scope: this
            },{
                text: 'Cancel',
                handler: function() {
                    this.hide();
                },
                scope: this
            }]
        });
        Imgorg.AlbumWin.superclass.initComponent.call(this);
    },
    
    addToAlbum: function() {
        var af = this.getComponent('album-select').getForm();
        if (af.isValid()) {
            if (this.selectedRecords) {
                var imageIds = [];
                for (var i = 0; i < this.selectedRecords.length; i++) {
                    var r = this.selectedRecords[i];
                    imageIds.push(r.data.dbid || r.data.id);
                }
                var fld = af.findField('album');
                var album = fld.getValue();
                
                Imgorg.ss.Images.addToAlbum({
                    images: imageIds,
                    album: album
                });
            }
            this.hide();
        }
    }
});
