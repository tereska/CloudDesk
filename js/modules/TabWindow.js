
Ext.define('MyDesktop.TabWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel'
    ],

    id:'tab-win',

    init : function(){
        this.launcher = {
            text: 'Tab Example',
            iconCls:'tabs',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tab-win');
        if(!win){
            win = desktop.createWindow({
                id: 'tab-win',
                title:'Tab Window',
                width:740,
                height:480,
                iconCls: 'tabs',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items: [
                    {
                        xtype: 'tabpanel',
                        activeTab:0,
                        bodyStyle: 'padding: 5px;',

                        items: [{
                            title: 'Tab Text 1',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 2',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 3',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 4',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        }]
                    }
                ]
            });
        }
        win.show();
        return win;
    }
});

