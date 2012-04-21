Ext.define('MyDesktop.Build', {
    extend: 'Ext.window.Window',

    height: 435,
    width: 540,
    layout: {
        type: 'anchor'
    },
    bodyPadding: 10,
    title: 'Services Builder',
    iconCls: 'notepad',
    interval: null,
	maximizable: false,
	resizable: false,
    
    listeners: {
      beforeclose: function(panel){
        clearInterval(panel.interval);
      }
    },
    initComponent: function() {
        var me = this;
        var buildId = null;
        var txtSvnPath = null;
        var txtOutput = null;
        var statusBar = null;
        var btnRefresh = null;
        var lblBuild = null;
        var btnBuild = null;
        var lblBuildLabel = null;
        var envGroup = null;
        var envVar = null;
        
        var onRefresh = function(){
          Ext.Ajax.request({
            url : '/api/app/build/info',
            method: 'GET',
            params :{
              build: buildId,
              env: envVar
            },
            success: function ( result, request ) {
                var jsonData = Ext.JSON.decode(result.responseText);
                txtOutput.setRawValue('-> Time: ' + new Date().toLocaleString() + '\n' + jsonData.INFO.LOG.join('\n'));
                
                if(jsonData.INFO.STATUS != "WORKING") {
                    clearInterval(me.interval);
                    if (jsonData.INFO.STATUS == "OK") {
                        statusBar.setStatus({
                            text: 'Build Completed!',
                            iconCls: 'x-status-valid'
                        });
                    } else {
                        statusBar.setStatus({
                            text: 'Build Failed!',
                            iconCls: 'x-status-error'
                        });
                    }
                }
            },
            failure: function ( result, request ) {
               var jsonData = Ext.JSON.decode(result.responseText);
               console.log('error', jsonData);
            },
            callback: function(options, success, response){
              
            }
          });
        };
        
        
        
        
        Ext.applyIf(me, {
            bbar: Ext.create('Ext.ux.StatusBar', {
                itemId: 'statusBar',
                defaultText: 'Default status text',
                text: 'Ready',
                iconCls: 'x-status-valid',
                items: [
                    {
                      xtype: 'tbtext',
                      itemId: 'lblBuildLabel',
                      text: 'build id:',
                      style: 'text-align: right;',
                      hidden: true
                    },
                    {
                      xtype: 'tbtext',
                      text: '',
                      itemId: 'lblBuild',
                      width: 285,
                      style: 'text-align: right;'
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'btnRefresh',
                        iconCls: 'cog',
                        text: 'Refresh',
                        disabled: true,
                        listeners: {
                            click:  function(){
                              onRefresh();
                            }
                        }
                    }
                ]
            }),
            items: [
                {
                    itemId: 'fldSvn',
                    xtype: 'fieldset',
                    height: 105,
                    width: 453,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    title: 'SVN Path:',
                    anchor: '100%',
                    items: [
                        {
                            itemId: 'txtSvnPath',
                            xtype: 'textfield',
                            value: 'http://svn.grupa.onet/svn/front/apps/content/microsite/MicrositeTE/trunk'
                        },
                        {
                            itemId: 'envGroup',
                            xtype: 'radiogroup',
                            fieldLabel: 'Environment',
                            labelPad: 0,
                            preventMark: true,
                            allowBlank: false,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'DEV',
                                    checked: true,
                                    name: 'env',
                                    inputValue: 'DEV'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'INT',
                                    name: 'env',
                                    inputValue: 'INT'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'PROD',
                                    name: 'env',
                                    inputValue: 'PROD'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnBuild',
                            text: 'Build',
                            listeners: {
                                click: function(){
                                    btnBuild.disable();
                                    envGroup.disable();
                                    statusBar.showBusy();
                                    envVar = envGroup.getValue().env;
                                    Ext.Ajax.request({
                                        url : '/api/app/build',
                                        method: 'GET',
                                        params :{
                                          svn: txtSvnPath.getRawValue(),
                                          env: envVar
                                        },
                                        success: function ( result, request ) {
                                            var jsonData = Ext.JSON.decode(result.responseText);
                                            buildId = jsonData;
                                            console.log(jsonData);
                                            lblBuild.setText(buildId);
                                            lblBuildLabel.show();
                                            btnRefresh.enable();
                                            
                                            me.interval = setInterval(function(){
                                                onRefresh();
                                            }, 2000);
                                            
                                        },
                                        failure: function ( result, request ) {
                                           var jsonData = Ext.JSON.decode(result.responseText);
                                           console.log('error', jsonData);
                                           statusBar.setStatus({
                                              text: 'Error',
                                              iconCls: 'x-status-error'
                                           });
                                        },
                                        callback: function(options, success, response){
                                          
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fldOutput',
                    height: 230,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    title: 'Automator output:',
                    items: [
                        {
                            itemId: 'txtTextarea',
                            xtype: 'textareafield',
                            height: 200,
                            width: 544,
                            labelPad: 0
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        
        txtSvnPath = this.getComponent('fldSvn').getComponent('txtSvnPath');
        txtOutput = this.getComponent('fldOutput').getComponent('txtTextarea');
        statusBar = this.getComponent('statusBar');
        btnRefresh = this.getComponent('statusBar').getComponent('btnRefresh');
        lblBuild = this.getComponent('statusBar').getComponent('lblBuild');
        lblBuildLabel = this.getComponent('statusBar').getComponent('lblBuildLabel');
        btnBuild = this.getComponent('fldSvn').getComponent('btnBuild');
        envGroup = this.getComponent('fldSvn').getComponent('envGroup');
        
    }
});