# Changelog

## 0.0.1

* Initial release

## 0.0.2

* Amend result of `pluralize('permission')` to 'permissions' to counter erronous result from inflection

## 0.0.3

* Fix to also pluralize 'Permission' (capital p)

## 0.0.4

* Remove pluralization of 'permission' to 'permissions'

## 0.0.5

* String to DateTime conversion

## 0.0.6

* Fix string to Time & DateTime conversion

## 0.0.7

* findAndReturn array method
* Import lodash with `runInContext()` to avoid modifying lodash for other modules (fixes issue #1)
* Remove all trailing whitespace

## 0.0.8

* Fix bug in findAndReturn array method

## 0.1.0

* Update module dependencies
* Update dev dependencies
* Remove `set` method - now provided in lodash
