#!/bin/sh

npx typeorm migration:run -d dist/configs/orm.js
pnpm run start:prod
