# Version 1.1.4 - July 6, 2016

* Add `.npmignore` so that npm doesn't use `.gitignore` by default.

# Version 1.1.3 - July 5, 2016

* Make React a peerDependency.

# Version 1.1.2 - July 5, 2016

* Loosen the React version dependency.

# Version 1.1.1 - April 12, 2016

* Fix a bug that was causing unnecessary toolbox updates.

# Version 1.1.0 - April 8, 2016

* Expose a `resize` function from `BlocklyEditor` and `BlocklyWorkspace` that causes the workspace to resize to fit its container element.

# Version 1.0.0 - April 4, 2016

* Breaking change: the component now uses [Immutable.js](https://facebook.github.io/immutable-js/) internally to track its state and properties for dramatically improved performance.  This is mostly invisible to embedding apps, but if they have a custom `processToolboxCategory` function, that function will now be passed an Immutable.js Map and is expected to return one (either modified or not).

# Version 0.1.2 - March 22, 2016

* Reconfigured the build to emit compiled ES5 in the dist-modules directory, for easier use in build systems.
* Add a default export so that this component can easily be used inside another ES6 module.
* Add support for PatientsLikeMe's [https://github.com/google/blockly/pull/224](pending pull request) on Blockly to allow typeahead search.
* Add a code of conduct.

# Version 0.1.0 - December 24, 2016

* Initial public release.
