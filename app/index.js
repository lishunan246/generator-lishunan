var generators=require('yeoman-generator');

module.exports=generators.Base.extend({
	constructor:function(){
		generators.Base.apply(this,arguments);
        this.argument('command',{type:String,required:false});
        this.option('path');
        this.option('name');
	},
    main:function(){
        switch (this.command){
            case 'new':
                var path=this.options.path;
                var name=(typeof this.options.name==="undefined")?'newapp':this.options.name;
                if(typeof this.options.path==="undefined")
                {
                    var done = this.async();
                    this.prompt({
                        type:'input',
                        name:'name',
                        message:'Set the path to create file',
                        default:'public'
                    },function(answers){
                        path=answers.name;
                        this.log(name);
                        this.log(path);
                        this._newNgApp(name,path);
                        done();
                    }.bind(this));
                }

                break;
            default :
                this.log("Usage:\nyo lishunan new --name appName --path public");
                this.log("Current root path:");
                this.log(this.destinationRoot());
        }
    },
    _newNgApp:function(name,path){
        this.log(path);
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(path+'/'+name+'.html'),
            {
                name:name
            }
        );
        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath(path+'/'+name+'.js'),
            {
                name:name
            }
        );
        this.fs.copyTpl(
            this.templatePath('index.scss'),
            this.destinationPath(path+'/'+name+'.scss'),
            {
                name:name
            }
        );
        this.fs.copyTpl(
            this.templatePath('index.controller.js'),
            this.destinationPath(path+'/'+name+'.controller.js'),
            {
                name:name
            }
        );
    }
});

