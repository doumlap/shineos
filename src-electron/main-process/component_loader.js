const fs = require('fs');
const corePath = 'src-electron/components/core';

export default class ComponentLoader {
    static instanciateModules = (window, app, bugsnag) => {
      let modules = [];

        let files = ComponentLoader.getComponents(corePath);

        if (files) {
          files.forEach(file => {
            import(`../components/core/${file.fileName}`).then((component) => {
              modules.push(new component.default(window, app, bugsnag));
            });
          });
        }

        return modules;
    }

    static getComponents = (path) => {
      let componentFiles = [];
      let files = fs.readdirSync(path);

      if (files) {
        files.forEach(file => {
          if (file.indexOf('.js' != -1)) {
            componentFiles.push({fileName: file.replace('.js', ''), componentName: ComponentLoader.guessComponentName(file)});
          }
        });
      }

      return componentFiles;
    }

    static guessComponentName = (fileName) => {
      let name = fileName.split('.')[0];
      name = name.replace('_', '');
      return name;
    }
}
