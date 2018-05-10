export default class AbstractComponent {
  window;
  app;
  bugsnag

  constructor(window, app, bugsnag) {
    if (this.constructor === AbstractComponent) {
      throw new TypeError('AbstractComponent is virtual and should be extended');
    }

    this.window = window;
    this.app = app;
    this.bugsnag = bugsnag;
  }
}
