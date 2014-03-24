Ext.define('WebInspect.view.news.NewsPdf',{
    extend: 'Ext.ux.panel.PDF',
	xtype: 'newspdf',
	config: {
		title: '详细新闻',
        layout    : 'fit',
        src       : 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf', // URL to the PDF - Same Domain or Server with CORS Support
        style     : {
            backgroundColor: '#333'
        }
	},
	
	setPdfUrl:function(url)
	{
        alert(url);
        var me = this;
//        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
//            function(fileSystem){me.gotFileSystem(fileSystem,me,url);},
//            function(error){me.fail(error,me);}
//        ); ////读文件
	},


    gotFileSystem:function(fileSystem,me,url){

        fileSystem.root.getFile("123.pdf", null,
            function(fileEntry){me.gotFileEntry(fileEntry,me,url);},
            function(error){me.fail(error,me);}
        );
    },

    gotFileEntry:function(fileEntry,me,url)
    {
        fileEntry.file(
            function(file){me.readDataUrl(file,me);},
            function(error){me.fail(error,me);}
        );
    },

    readDataUrl:function(file,me) {

        var reader = new FileReader();
        reader.onloadend = function(evt) {


            var base64String = evt.target.result;
            alert(evt.target.result);
            base64String = base64String.substring(28);
            var byteArray = Base64Binary.decodeArrayBuffer(base64String);
            alert(byteArray);
            me.setData(byteArray);

        };
        reader.readAsDataURL(file);
    },


    fail:function(err){

    }

});