#!/bin/sh

# Run Migrations
pnpm migration:run -- -d dist/configs/orm.js

# Start the application
pnpm run start:prod
