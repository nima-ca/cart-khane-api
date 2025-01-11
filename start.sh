#!/bin/sh

pnpm migration:run -- -d dist/configs/orm.js
pnpm run start:prod
