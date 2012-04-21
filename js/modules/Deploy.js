
Ext.define('MyDesktop.Deploy', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Stores.BuildList',
        'Stores.AppInfoActive',
        'Stores.AppInfoInitialized',
        'Stores.AppInfoBuilds',
        'Ext.ux.StatusBar',
        'MyDesktop.Build'
    ],

    id: 'deploy',

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('deploy');
        if(!win){
            win = desktop.createWindow({
                id: 'deploy',
                title:'Services Manager',
                width:600,
                height:480,
                iconCls: 'notepad',
                animCollapse:true,
                border: false,
                resizable: false,
                hideMode: 'offsets',
                maximizable: false,
                plain: 1,
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                bbar: Ext.create('Ext.ux.StatusBar', {
                    id: 'basic-statusbar',
                    defaultText: 'Default status text',
                    //defaultIconCls: 'default-icon',
                    text: 'Ready',
                    iconCls: 'x-status-valid',
                    items: [
                        {
                            id: 'btnRefresh',
                            xtype: 'button',
                            iconCls: 'cog',
                            text: 'Reload'
                        }
                    ]
                }),
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                id: 'btnNewBuild',
                                iconCls: 'add',
                                xtype: 'button',
                                text: 'New Build'
                            },
                            {
                                id: 'btnReloadServices',
                                iconCls: 'cog',
                                xtype: 'button',
                                text: 'Reload Services'
                            },
                            {
                                xtype: 'tbfill'
                            },
                            {
                                id: 'btnGroup',
                                xtype: 'buttongroup',
                                preventHeader: true,
                                title: 'Environment',
                                columns: 3,
                                items: [
                                    {
                                        id: 'btnDev',
                                        xtype: 'button',
                                        enableToggle: true,
                                        text: 'DEV',
                                        toggleGroup: 'env'
                                    },
                                    {
                                        id: 'btnInt',
                                        xtype: 'button',
                                        enableToggle: true,
                                        text: 'INT',
                                        toggleGroup: 'env'
                                    },
                                    {
                                        id: 'btnProd',
                                        xtype: 'button',
                                        enableToggle: true,
										pressed: true,
                                        text: 'PROD',
                                        toggleGroup: 'env'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                items: [
                    {
                        xtype: 'treepanel',
                        id: 'treeServices',
                        width: 200,
                        rootVisible: true,
                        //title: 'My Tree Panel',
                        store: Ext.create('Stores.BuildList')
                    },
                    {
                        id: 'pnlService',
                        xtype: 'panel',
                        //title: 'My Panel',
                        frame: false,
                        //baseCls: 'x-box',
                        bodyStyle: 'background-color:#dfe8f5;',
                        bodyPadding: 5,
                        flex: 1,
                        activeItem: 0,
                        layout: {
                            type: 'card'
                        },
                        
                        
                        
                        items: [
                            {
                                xtype: 'container',
								itemId: 'ctnWelcome',
                                flex: 1,
                                items: [
                                     {
                                        xtype: 'label',
                                        text: 'Choose a service or a specific version to see details.'
                                     }
                                ]
                            },
                            {
                                xtype: 'container',
								itemId: 'ctnAppInfo',
                                flex: 1,
                                items: [
                                  {
                                      xtype: 'fieldset',
                                      margin: '0 0 10 0',
                                      title: 'Application Info',
                                      items: [
                                          {
                                              id: 'txtAppName',
                                              xtype: 'textfield',
                                              fieldLabel: 'Name',
                                              readOnly: true,
                                              anchor: '100%'
                                          },
                                          {
                                              id: 'txtAppVersion',
                                              xtype: 'textfield',
                                              fieldLabel: 'Version',
                                              readOnly: true,
                                              anchor: '100%'
                                          },
                                          {
                                              id: 'txtAppBuild',
                                              xtype: 'textfield',
                                              fieldLabel: 'Build',
                                              readOnly: true,
                                              anchor: '100%'
                                          },
                                          {
                                              id: 'txtAppType',
                                              xtype: 'textfield',
                                              fieldLabel: 'Type',
                                              readOnly: true,
                                              anchor: '100%'
                                          }
                                      ]
                                  },
                                  {
                                      xtype: 'fieldset',
                                      //height: 69,
                                      margin: '0 0 10 0',
                                      layout: {
                                          padding: 10,
                                          type: 'hbox'
                                      },
                                      title: 'Application Status',
                                      items: [
                                          {
                                              id: 'chbInitialized',
                                              xtype: 'checkboxfield',
                                              boxLabel: 'Initialized',
                                              flex: 1
                                          },
                                          {
                                              id: 'chbActivated',
                                              xtype: 'checkboxfield',
                                              boxLabel: 'Activated',
                                              flex: 1
                                          },
                                          {
                                              id: 'btnChange',
                                              xtype: 'button',
                                              text: 'Change',
                                              flex: 1
                                          }
                                      ]
                                  },
                                  {
                                      id: 'fsInstances',
                                      xtype: 'fieldset',
                                      padding: '0 10 10 10',
                                      title: 'Instances',
                                      items: [
                                          {
                                              id: 'nbfRequested',
                                              xtype: 'numberfield',
                                              fieldLabel: 'Requested',
                                              anchor: '100%',
                                              allowBlank: false,
                                              emptyText: 0,
                                              maxLengthText: 3,
                                              minLength: 1,
                                              allowDecimals: false,
                                              maxValue: 100,
                                              minValue: 0,
                                              editable: false
                                          },
                                          {
                                              id: 'txtActual',
                                              xtype: 'textfield',
                                              fieldLabel: 'Actual',
                                              readOnly: true,
                                              anchor: '100%'
                                          },
                                          {
                                              id: 'btnSetInstances',
                                              xtype: 'button',
                                              margin: '5 0 0 0',
                                              text: 'Set Instances',
                                              anchor: '100%'
                                          }
                                      ]
                                  }
                                ]
                            },
                            {
                                xtype: 'container',
								itemId: 'ctnAppStats',
                                flex: 1,
                                autoScroll: true,
                                items: [
                                  {
                                      xtype: 'fieldset',
                                      margin: '0 0 10 0',
                                      title: 'Application Info',
                                      width: 362,
                                      items: [
                                          {
                                              id: 'txtServiceName',
                                              xtype: 'textfield',
                                              fieldLabel: 'Name',
                                              readOnly: true,
                                              anchor: '100%'
                                          }
                                      ]
                                  },
                                  {
                                      xtype: 'fieldset',
                                      margin: '0 0 10 0',
                                      title: 'Active Versions',
                                      width: 362,
                                      items: [
                                          {
                                              id: 'gridAppInstances',
                                              xtype: 'gridpanel',
                                              width: 340,
                                              store: Ext.create('Stores.AppInfoActive'),
                                              frameHeader: false,
                                              preventHeader: true,
                                              title: 'My Grid Panel',
                                              enableColumnHide: false,
                                              enableColumnMove: false,
                                              enableColumnResize: false,
                                              forceFit: true,
                                              columnLines: true,
                                              margin: '0 0 10 0',
                                              columns: [
                                                  {
                                                      xtype: 'gridcolumn',
                                                      dataIndex: 'appName',
                                                      text: 'Version'
                                                  },
                                                  {
                                                      xtype: 'numbercolumn',
                                                      width: 50,
                                                      dataIndex: 'requested',
                                                      text: 'Requested',
                                                      format: '0,000',
                                                      align: 'center'
                                                  },
                                                  {
                                                      xtype: 'numbercolumn',
                                                      width: 50,
                                                      dataIndex: 'instances',
                                                      text: 'Instances',
                                                      format: '0,000',
                                                      align: 'center'
                                                  }
                                              ]
                                          }
                                      ]
                                  },
                                  {
                                      xtype: 'fieldset',
                                      margin: '0 0 10 0',
                                      title: 'Additional Info',
                                      layout: {
                                          align: 'stretch',
                                          type: 'hbox'
                                      },
                                      height: 200,
                                      width: 362,
                                      items: [
                                          {
                                              id: 'gridAppInitialized',
                                              xtype: 'gridpanel',
                                              width: 165,
                                              store: Ext.create('Stores.AppInfoInitialized'),
                                              frameHeader: false,
                                              preventHeader: true,
                                              title: 'My Grid Panel',
                                              enableColumnHide: false,
                                              enableColumnMove: false,
                                              enableColumnResize: false,
                                              forceFit: true,
                                              columnLines: true,
                                              margin: '0 0 13 0',
                                              columns: [
                                                  {
                                                      xtype: 'gridcolumn',
                                                      dataIndex: 'appName',
                                                      text: 'Initialized Versions'
                                                  }
                                              ]
                                          },
                                          {
                                              id: 'gridAppBuilds',
                                              xtype: 'gridpanel',
                                              width: 165,
                                              store: Ext.create('Stores.AppInfoBuilds'),
                                              frameHeader: false,
                                              preventHeader: true,
                                              title: 'My Grid Panel',
                                              enableColumnHide: false,
                                              enableColumnMove: false,
                                              enableColumnResize: false,
                                              forceFit: true,
                                              columnLines: true,
                                              margin: '0 0 13 5',
                                              columns: [
                                                  {
                                                      xtype: 'gridcolumn',
                                                      dataIndex: 'appName',
                                                      text: 'Builds List'
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                                ]
                            }
                            
                        ]
                    }
                ]
            });
            
            
            var getEnv = function(){
                if(Ext.getCmp('btnDev').pressed){
                    return 'DEV';
                } else if(Ext.getCmp('btnInt').pressed) {
                    return 'INT';
                } else {
                    return 'PROD';
                }
            
            }
            
            Ext.getCmp('btnDev').on('click', function(button, e, options) {
              if(!Ext.getCmp('btnDev').pressed){
                Ext.getCmp('btnDev').toggle( true, true );
                return;
              }
              Ext.getCmp('treeServices').getStore().getProxy().extraParams.env = getEnv();        
              Ext.getCmp('pnlService').getLayout().setActiveItem(0);
              Ext.getCmp('treeServices').getRootNode().removeAll();
              Ext.getCmp('treeServices').getStore().load();
            });
            Ext.getCmp('btnInt').on('click', function(button, e, options) {
              if(!Ext.getCmp('btnInt').pressed){
                Ext.getCmp('btnInt').toggle( true, true );
                return;
              }
              Ext.getCmp('treeServices').getStore().getProxy().extraParams.env = getEnv();        
              Ext.getCmp('pnlService').getLayout().setActiveItem(0);
              Ext.getCmp('treeServices').getRootNode().removeAll();
              Ext.getCmp('treeServices').getStore().load();
            });
            Ext.getCmp('btnProd').on('click', function(button, e, options) {
              if(!Ext.getCmp('btnProd').pressed){
                Ext.getCmp('btnProd').toggle( true, true );
                return;
              }
              Ext.getCmp('treeServices').getStore().getProxy().extraParams.env = getEnv();        
              Ext.getCmp('pnlService').getLayout().setActiveItem(0);
              Ext.getCmp('treeServices').getRootNode().removeAll();
              Ext.getCmp('treeServices').getStore().load();
            });
            
            
            Ext.getCmp('btnReloadServices').on('click', function(button, e, options) {
              Ext.getCmp('pnlService').getLayout().setActiveItem(0);
              Ext.getCmp('treeServices').getRootNode().removeAll();
              Ext.getCmp('treeServices').getStore().load();
            });
            
            Ext.getCmp('btnNewBuild').on('click', function(button, e, options) {
              var newBuild = new MyDesktop.Build();
              newBuild.show();
            });
            
            Ext.getCmp('btnChange').on('click', function(button, e, options) {
              
              Ext.getCmp('basic-statusbar').showBusy();
              
              var isInitialized = Ext.getCmp('chbInitialized').getRawValue();
              var isActivated   = Ext.getCmp('chbActivated').getRawValue();
              
              if(!isInitialized && isActivated){
                Ext.getCmp('chbInitialized').setRawValue(true);
                isInitialized = true;
              }
              
              var appName = Ext.getCmp('txtAppName').getRawValue() + '_' +
                            Ext.getCmp('txtAppVersion').getRawValue() + '.' +
                            Ext.getCmp('txtAppBuild').getRawValue();
              
              Ext.Ajax.request({
                 url : '/api/app/init',
                  method: 'GET',
                  params :{
                    app: Ext.getCmp('txtAppName').getRawValue(), 
                    version: Ext.getCmp('txtAppVersion').getRawValue(),
                    build: Ext.getCmp('txtAppBuild').getRawValue(),
                    initialize: isInitialized?1:-1, 
                    activate: isActivated?1:-1,
                    env: getEnv()
                  },
                  success: function ( result, request ) {
                      Ext.getCmp('pnlService').enable();
                      var jsonData = Ext.JSON.decode(result.responseText);
                      Ext.getCmp('chbActivated').resumeEvents();
                      Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Ready',
                        iconCls: 'x-status-valid'
                      });
                 },
                 failure: function ( result, request ) {
                     var jsonData = Ext.JSON.decode(result.responseText);
                     console.log('error', jsonData);
                     Ext.getCmp('pnlService').disable();
                     Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Error',
                        iconCls: 'x-status-error'
                     });
                 },
                 callback: function(options, success, response){
                   //mask.hide();
                   //Ext.getCmp('treeServices').body.unmask();
                   updateAppInfo(appName, function(){
                     /*
                     Ext.MessageBox.show({
                         title: 'Info',
                         msg: 'Service settings were changed successfully!',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.window.MessageBox.INFO
                     });
                     */
                     Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Service settings were changed successfully!',
                        iconCls: 'x-status-valid'
                      });
                   });
                 }
               });
            });
            
            Ext.getCmp('btnSetInstances').on('click', function(button, e, options) {
              Ext.getCmp('basic-statusbar').showBusy();
              
              var appName = Ext.getCmp('txtAppName').getRawValue() + '_' +
                            Ext.getCmp('txtAppVersion').getRawValue() + '.' +
                            Ext.getCmp('txtAppBuild').getRawValue();
              
              Ext.Ajax.request({
                 url : '/api/app/instances',
                  method: 'GET',
                  params :{
                    app: Ext.getCmp('txtAppName').getRawValue(), 
                    version: Ext.getCmp('txtAppVersion').getRawValue(),
                    build: Ext.getCmp('txtAppBuild').getRawValue(),
                    instances: Ext.getCmp('nbfRequested').getRawValue(),
                    env: getEnv()
                  },
                  success: function ( result, request ) {
                      Ext.getCmp('pnlService').enable();
                      var jsonData = Ext.JSON.decode(result.responseText);
                      Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Ready',
                        iconCls: 'x-status-valid'
                      });
                 },
                 failure: function ( result, request ) {
                     var jsonData = Ext.JSON.decode(result.responseText);
                     console.log('error', jsonData);
                     Ext.getCmp('pnlService').disable();
                     Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Error',
                        iconCls: 'x-status-error'
                     });
                 },
                 callback: function(options, success, response){
                   //mask.hide();
                   //Ext.getCmp('treeServices').body.unmask();
                   updateAppInfo(appName, function(){
                     /*
                     Ext.MessageBox.show({
                         title: 'Info',
                         msg: 'Instances were changed successfully!',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.window.MessageBox.INFO
                     });
                     */
                     Ext.getCmp('basic-statusbar').setStatus({
                        text: 'Instances were changed successfully!',
                        iconCls: 'x-status-valid'
                      });
                   });
                 }
               });
            });
            
            
            Ext.getCmp('btnRefresh').on('click', function(button, e, options) {
			
				var activeItem = Ext.getCmp('pnlService').getLayout().getActiveItem().itemId;
				if (activeItem == 'ctnAppInfo') {
					var appName = Ext.getCmp('txtAppName').getRawValue() + '_' +
                            Ext.getCmp('txtAppVersion').getRawValue() + '.' +
                            Ext.getCmp('txtAppBuild').getRawValue();
                    updateAppInfo(appName);
				} else if (activeItem == 'ctnAppStats') {
					var appName = Ext.getCmp('txtServiceName').getRawValue();
                   
                    Ext.getCmp('gridAppInitialized').getStore().removeAll();
					Ext.getCmp('gridAppBuilds').getStore().removeAll();
					Ext.getCmp('gridAppInstances').getStore().removeAll();
					
                    Ext.getCmp('gridAppInitialized').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppInitialized').getStore().getProxy().extraParams.node = appName;
                    Ext.getCmp('gridAppInitialized').getStore().load();
                    
                    Ext.getCmp('gridAppBuilds').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppBuilds').getStore().getProxy().extraParams.node = appName;
                    Ext.getCmp('gridAppBuilds').getStore().load();
                    
                    Ext.getCmp('gridAppInstances').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppInstances').getStore().getProxy().extraParams.node = appName;
                    Ext.getCmp('gridAppInstances').getStore().load();
				}
            });
            
            
            var mask = new Ext.LoadMask(Ext.getCmp('treeServices'), Ext.getCmp('treeServices').maskConfig);    
            
            function updateAppInfo(id, cb){
            
                 Ext.getCmp('basic-statusbar').showBusy();
            
                 Ext.Ajax.request({
                     url : '/api/stats/' + id,
                              method: 'GET',
                              params :{id: id, env: getEnv()},
                              success: function ( result, request ) {
                                  Ext.getCmp('pnlService').enable();
                                  var jsonData = Ext.JSON.decode(result.responseText);
                                  
                                  Ext.getCmp('txtAppName').setRawValue(jsonData.info.appName);
                                  Ext.getCmp('txtAppVersion').setRawValue(jsonData.info.appVersion);
                                  Ext.getCmp('txtAppBuild').setRawValue(jsonData.info.appBuild);
                                  
                                  if(jsonData.isInitialized){
                                    Ext.getCmp('chbInitialized').setRawValue(true);
                                    Ext.getCmp('chbInitialized').disable();
                                  } else {
                                    Ext.getCmp('chbInitialized').setRawValue(false);
                                    Ext.getCmp('chbInitialized').enable();
                                  }
                                  
                                  if(jsonData.isActivated){
                                    Ext.getCmp('chbActivated').setRawValue(true);
                                    Ext.getCmp('txtAppType').setRawValue(jsonData.active.paral_type);
                                    Ext.getCmp('nbfRequested').setRawValue(jsonData.stats.REQUEST.num_instances);
                                    Ext.getCmp('txtActual').setRawValue(jsonData.stats.STATE.NUM_INSTANCES);
                                    Ext.getCmp('fsInstances').enable();
                                    Ext.getCmp('txtAppType').enable();
                                  } else {
                                    Ext.getCmp('chbActivated').setRawValue(false);
                                    Ext.getCmp('txtAppType').setRawValue('');
                                    Ext.getCmp('nbfRequested').setRawValue('');
                                    Ext.getCmp('txtActual').setRawValue('');
                                    Ext.getCmp('fsInstances').disable();
                                    Ext.getCmp('txtAppType').disable();
                                  }
                                  
                                  Ext.getCmp('chbActivated').resumeEvents();
                                  
                                  Ext.getCmp('basic-statusbar').setStatus({
                                    text: 'Ready',
                                    iconCls: 'x-status-valid'
                                  });
                             },
                             failure: function ( result, request ) {
                                 var jsonData = Ext.JSON.decode(result.responseText);
                                 console.log('error', jsonData);
                                 Ext.getCmp('pnlService').disable();
                                 Ext.getCmp('basic-statusbar').setStatus({
                                    text: 'Error',
                                    iconCls: 'x-status-error'
                                 });
                                 
                             },
                             callback: function(options, success, response){
                               mask.hide();
                               Ext.getCmp('treeServices').body.unmask();
                               if(cb){
                                 cb();
                               }
                             }
                   });
            }
            
			Ext.getCmp('treeServices').on('load', function () {
				Ext.getCmp('treeServices').determineScrollbars();
                Ext.getCmp('treeServices').doComponentLayout();
			});
			Ext.getCmp('gridAppInstances').getStore().on('load', function () {
			    Ext.getCmp('gridAppInstances').determineScrollbars();
			    Ext.getCmp('gridAppInstances').doComponentLayout();
		    });
			Ext.getCmp('gridAppBuilds').getStore().on('load', function () {
			    Ext.getCmp('gridAppBuilds').determineScrollbars();
			    Ext.getCmp('gridAppBuilds').doComponentLayout();
		    });
            Ext.getCmp('gridAppInitialized').getStore().on('load', function () {
				Ext.getCmp('gridAppInitialized').determineScrollbars();
				Ext.getCmp('gridAppInitialized').doComponentLayout();
			});
					
            Ext.getCmp('treeServices').getSelectionModel().on('select', function(selModel, record) {

                if (record.get('leaf')) {
                    mask.show();
                    Ext.getCmp('treeServices').body.mask();
                    updateAppInfo(record.get('id'), function(){
                        Ext.getCmp('pnlService').getLayout().setActiveItem(1);
                    });
                } else if (record.get('id') != 'root') {
				
                    Ext.getCmp('txtServiceName').setRawValue(record.get('id'));
                    Ext.getCmp('pnlService').getLayout().setActiveItem(2);
                   
                    Ext.getCmp('gridAppInitialized').getStore().removeAll();
					Ext.getCmp('gridAppBuilds').getStore().removeAll();
					Ext.getCmp('gridAppInstances').getStore().removeAll();
					
                    Ext.getCmp('gridAppInitialized').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppInitialized').getStore().getProxy().extraParams.node = record.get('id');
                    Ext.getCmp('gridAppInitialized').getStore().load();
                    
                    Ext.getCmp('gridAppBuilds').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppBuilds').getStore().getProxy().extraParams.node = record.get('id');
                    Ext.getCmp('gridAppBuilds').getStore().load();
                    
                    Ext.getCmp('gridAppInstances').getStore().getProxy().extraParams.env = getEnv();
                    Ext.getCmp('gridAppInstances').getStore().getProxy().extraParams.node = record.get('id');
                    Ext.getCmp('gridAppInstances').getStore().load();
                }
                
            });
        }
        win.show();
        return win;
    }
});

