# Migrating

[![npm version](https://badge.fury.io/js/vh-check.svg)](https://badge.fury.io/js/vh-check)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [from v1.0+ to v2.0](#from-v10-to-v20)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### from v1.0+ to v2.0

- Return value has changed  
  Instead of:
  ```js
  var isNeeded = vhCheck()
  ```
  you will need to
  ```js
  var test = vhCheck()
  var isNeeded = test.isNeeded
  ```
