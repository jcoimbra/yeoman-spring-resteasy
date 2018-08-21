var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'groupId',
            message: 'The group id of the maven project.',
            default: 'org.yo',
            store: true
        }, {
            type: 'input',
            name: 'artifactId',
            message: 'The artifact id of the maven project.',
            default: 'man',
            store: true
        }, {
            type: 'input',
            name: 'firstVersion',
            message: 'The first version of the generated maven project.',
            default: '0.0.1-SNAPSHOT',
            store: true
        }, {
            type: 'input',
            name: 'name',
            message: 'This project name',
            default: 'Yeoman',
            store: true
        }, {
            type: 'input',
            name: 'basePath',
            message: 'The base path for all resources.',
            default: 'api',
            store: true
        }]);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath('pom.xml'),
            {
                groupId: this.answers.groupId,
                artifactId: this.answers.artifactId,
                firstVersion: this.answers.firstVersion,
                name: this.answers.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('App.java'),
            this.destinationPath(`src/main/java/com/example/demo/${this._camelCase(this.answers.name)}Application.java`),
            {appClass: this._camelCase(this.answers.name)}
        );
        this.fs.copyTpl(
            this.templatePath('JaxrsApplication.java'),
            this.destinationPath('src/main/java/com/example/demo/JaxrsApplication.java'),
            {basePath: this.answers.basePath}
        );
        this.fs.copy(
            this.templatePath('Yo.java'),
            this.destinationPath('src/main/java/com/example/demo/resource/Yo.java')
        );
        this.fs.write(
            this.destinationPath('src/main/resources/application.properties'),
            ''
        );
        this.fs.copyTpl(
            this.templatePath('AppTests.java'),
            this.destinationPath(`src/test/java/com/example/demo/${this._camelCase(this.answers.name)}ApplicationTests.java`),
            {appClass: this._camelCase(this.answers.name)}
        );
        mkdirp.sync('src/main/resources/static');
        mkdirp.sync('src/main/resources/templates');
    }

    _camelCase(str) {
        return str
            .replace(/^[^a-z]/g, '')
            .replace(/^[a-z]/g, letter => letter.toUpperCase())
            .replace(/[^a-z,^A-Z,^0-9]/g, '');
    }
};