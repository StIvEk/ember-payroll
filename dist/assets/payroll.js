"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('payroll/app', ['exports', 'ember', 'payroll/resolver', 'ember-load-initializers', 'payroll/config/environment'], function (exports, _ember, _payrollResolver, _emberLoadInitializers, _payrollConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _payrollConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _payrollConfigEnvironment['default'].podModulePrefix,
    Resolver: _payrollResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _payrollConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('payroll/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'payroll/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _payrollConfigEnvironment) {

  var name = _payrollConfigEnvironment['default'].APP.name;
  var version = _payrollConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('payroll/components/employee-details', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('payroll/components/employees-filter', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        classNames: ['employees-filter'],
        value: '',

        init: function init() {
            var _this = this;

            this._super.apply(this, arguments);
            this.get('filter')('').then(function (results) {
                return _this.set('results', results);
            });
        },

        actions: {
            handleFilterEntry: function handleFilterEntry() {
                var _this2 = this;

                var filterInputValue = this.get('value');
                var filterAction = this.get('filter');
                filterAction(filterInputValue).then(function (filterResults) {
                    return _this2.set('results', filterResults);
                });
            }
        }
    });
});
define('payroll/controllers/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        actions: {
            filterByName: function filterByName(param) {
                if (param !== '') {
                    return this.get('store').query('employee', { name: param });
                } else {
                    return this.get('store').findAll('employee');
                }
            }
        }
    });
});
define('payroll/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('payroll/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('payroll/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'payroll/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _payrollConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_payrollConfigEnvironment['default'].APP.name, _payrollConfigEnvironment['default'].APP.version)
  };
});
define('payroll/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('payroll/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('payroll/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'payroll/config/environment', 'payroll/mirage/config', 'ember-cli-mirage/server', 'lodash/object/assign'], function (exports, _emberCliMirageUtilsReadModules, _payrollConfigEnvironment, _payrollMirageConfig, _emberCliMirageServer, _lodashObjectAssign) {
  exports.startMirage = startMirage;
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }

      if (_shouldUseMirage(_payrollConfigEnvironment['default'].environment, _payrollConfigEnvironment['default']['ember-cli-mirage'])) {
        startMirage(_payrollConfigEnvironment['default']);
      }
    }
  };

  function startMirage() {
    var env = arguments.length <= 0 || arguments[0] === undefined ? _payrollConfigEnvironment['default'] : arguments[0];

    var environment = env.environment;
    var modules = (0, _emberCliMirageUtilsReadModules['default'])(env.modulePrefix);
    var options = (0, _lodashObjectAssign['default'])(modules, { environment: environment, baseConfig: _payrollMirageConfig['default'], testConfig: _payrollMirageConfig.testConfig });

    return new _emberCliMirageServer['default'](options);
  }

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('payroll/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('payroll/initializers/export-application-global', ['exports', 'ember', 'payroll/config/environment'], function (exports, _ember, _payrollConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_payrollConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _payrollConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_payrollConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('payroll/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('payroll/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('payroll/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("payroll/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('payroll/mirage/config', ['exports'], function (exports) {
    exports['default'] = function () {
        this.get('/employees', function (db, request) {
            var employees = [{
                type: 'employees',
                id: 1,
                attributes: {
                    firstname: "Tom",
                    surname: "Roberts",
                    gender: "male",
                    title: "Mr.",
                    dob: "21/04/1986",
                    age: "29",
                    salary: "59783.00",
                    takehome: "41999.84",
                    incometax: "13316.20",
                    nationalinsurance: "4466.96"
                }
            }, {
                type: 'employees',
                id: 2,
                attributes: {
                    firstname: "Louis",
                    surname: "Singh",
                    gender: "male",
                    title: "Mr.",
                    dob: "16/04/1979",
                    age: "36",
                    salary: "50739.00",
                    takehome: "36754.32",
                    incometax: "9698.60",
                    nationalinsurance: "4286.08"
                }
            }, {
                type: 'employees',
                id: 3,
                attributes: {
                    firstname: "Mohammed",
                    surname: "John",
                    gender: "male",
                    title: "Mr.",
                    dob: "18/05/1992",
                    age: "23",
                    salary: "26389.00",
                    takehome: "21032.00",
                    incometax: "3157.80",
                    nationalinsurance: "2199.48"
                }
            }, {
                type: 'employees',
                id: 4,
                attributes: {
                    firstname: "Owen",
                    surname: "Humphreys",
                    gender: "male",
                    title: "Mr.",
                    dob: "15/05/1972",
                    age: "43",
                    salary: "31336.00",
                    takehome: "24395.68",
                    incometax: "4147.20",
                    nationalinsurance: "2793.12"
                }
            }, {
                type: 'employees',
                id: 5,
                attributes: {
                    firstname: "Holly",
                    surname: "Gregory",
                    gender: "female",
                    title: "Ms.",
                    dob: "31/01/1993",
                    age: "22",
                    salary: "60176.00",
                    takehome: "42227.78",
                    incometax: "13473.40",
                    nationalinsurance: "4474.82"
                }
            }, {
                type: 'employees',
                id: 6,
                attributes: {
                    firstname: "Skye",
                    surname: "Lawrence",
                    gender: "female",
                    title: "Mrs.",
                    dob: "22/06/1979",
                    age: "36",
                    salary: "42552.00",
                    takehome: "32005.86",
                    incometax: "6423.80",
                    nationalinsurance: "4122.34"
                }
            }, {
                type: 'employees',
                id: 7,
                attributes: {
                    firstname: "Tom",
                    surname: "Carey",
                    gender: "male",
                    title: "Mr.",
                    dob: "03/06/1994",
                    age: "21",
                    salary: "75316.00",
                    takehome: "51008.98",
                    incometax: "19529.40",
                    nationalinsurance: "4777.62"
                }
            }];

            if (request.queryParams.name !== undefined) {
                var filteredEmployees = employees.filter(function (i) {
                    var attrs = i.attributes;
                    return (attrs.firstname + " " + attrs.surname).toLowerCase().indexOf(request.queryParams.name.toLowerCase()) !== -1;
                });
                return { data: filteredEmployees };
            } else {
                return { data: employees };
            }
        });
    };
});
define("payroll/mirage/scenarios/default", ["exports"], function (exports) {
  exports["default"] = function () /* server */{

    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
       Make sure to define a factory for each model you want to create.
    */

    // server.createList('post', 10);
  };
});
define('payroll/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.JSONAPISerializer.extend({});
});
define('payroll/models/employee', ['exports', 'ember', 'ember-data/model', 'ember-data/attr'], function (exports, _ember, _emberDataModel, _emberDataAttr) {
    exports['default'] = _emberDataModel['default'].extend({
        firstname: (0, _emberDataAttr['default'])("string"),
        surname: (0, _emberDataAttr['default'])("string"),
        gender: (0, _emberDataAttr['default'])("string"),
        title: (0, _emberDataAttr['default'])("string"),
        dob: (0, _emberDataAttr['default'])("string"),
        age: (0, _emberDataAttr['default'])("string"),
        salary: (0, _emberDataAttr['default'])("string"),
        takehome: (0, _emberDataAttr['default'])("string"),
        incometax: (0, _emberDataAttr['default'])("string"),
        nationalinsurance: (0, _emberDataAttr['default'])("string"),

        fullname: _ember['default'].computed('firstname', 'surname', function () {
            return this.get('firstname') + ' ' + this.get('surname');
        })
    });
});
define('payroll/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('payroll/router', ['exports', 'ember', 'payroll/config/environment'], function (exports, _ember, _payrollConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _payrollConfigEnvironment['default'].locationType,
    rootURL: _payrollConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('payroll/routes/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            return this.get('store').findAll('employee');
        }
    });
});
define('payroll/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("payroll/templates/components/employee-details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "payroll/templates/components/employee-details.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "employee-card");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "employee-name");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "personal-details");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("gender:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("dob:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("age:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "salary-details");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "label");
        var el5 = dom.createTextNode("Salary:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "label");
        var el5 = dom.createTextNode("Income Tax:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value deduction");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "label");
        var el5 = dom.createTextNode("National Insurance:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value deduction");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "detail");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "label");
        var el5 = dom.createTextNode("Take Home:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element0, [5]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(element1, 0, 0);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1, 2]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [3, 2]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [5, 2]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [1, 2]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element3, [3, 2]), 0, 0);
        morphs[7] = dom.createMorphAt(dom.childAt(element3, [5, 2]), 0, 0);
        morphs[8] = dom.createMorphAt(dom.childAt(element3, [7, 2]), 0, 0);
        return morphs;
      },
      statements: [["content", "employee.title", ["loc", [null, [3, 12], [3, 30]]], 0, 0, 0, 0], ["content", "employee.fullname", ["loc", [null, [3, 31], [3, 52]]], 0, 0, 0, 0], ["content", "employee.gender", ["loc", [null, [8, 50], [8, 69]]], 0, 0, 0, 0], ["content", "employee.dob", ["loc", [null, [12, 47], [12, 63]]], 0, 0, 0, 0], ["content", "employee.age", ["loc", [null, [16, 47], [16, 63]]], 0, 0, 0, 0], ["content", "employee.salary", ["loc", [null, [22, 64], [22, 83]]], 0, 0, 0, 0], ["content", "employee.incometax", ["loc", [null, [26, 78], [26, 100]]], 0, 0, 0, 0], ["content", "employee.nationalinsurance", ["loc", [null, [30, 86], [30, 116]]], 0, 0, 0, 0], ["content", "employee.takehome", ["loc", [null, [34, 67], [34, 88]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("payroll/templates/components/employees-filter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "payroll/templates/components/employees-filter.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [1, 14], [1, 19]]], 0, 0, 0, 0]], [], [], 0, 0], "key-up", ["subexpr", "action", ["handleFilterEntry"], [], ["loc", [null, [1, 27], [1, 55]]], 0, 0], "placeholder", "Filter By Name"], ["loc", [null, [1, 0], [1, 86]]], 0, 0], ["inline", "yield", [["get", "results", ["loc", [null, [2, 8], [2, 15]]], 0, 0, 0, 0]], [], ["loc", [null, [2, 0], [2, 17]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("payroll/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.7.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 8
              },
              "end": {
                "line": 9,
                "column": 8
              }
            },
            "moduleName": "payroll/templates/index.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["inline", "employee-details", [], ["employee", ["subexpr", "@mut", [["get", "filteredEmployee", ["loc", [null, [8, 44], [8, 60]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [8, 16], [8, 62]]], 0, 0]],
          locals: ["filteredEmployee"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "payroll/templates/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "results");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "filteredEmployees", ["loc", [null, [7, 16], [7, 33]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [7, 8], [9, 17]]]]],
        locals: ["filteredEmployees"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "payroll/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "payroll-title");
        var el2 = dom.createTextNode("Employees Payroll");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "employees-filter", [], ["filter", ["subexpr", "action", ["filterByName"], [], ["loc", [null, [4, 11], [4, 34]]], 0, 0]], 0, null, ["loc", [null, [3, 0], [11, 21]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('payroll/tests/mirage/mirage/config.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
define('payroll/tests/mirage/mirage/scenarios/default.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
define('payroll/tests/mirage/mirage/serializers/application.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass jshint.');
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('payroll/config/environment', ['ember'], function(Ember) {
  var prefix = 'payroll';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("payroll/app")["default"].create({"name":"payroll","version":"0.0.0+f8b55b2f"});
}

/* jshint ignore:end */
//# sourceMappingURL=payroll.map