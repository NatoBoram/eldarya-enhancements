#!/bin/sh

FILE='src/typedoc.ts'

rm $FILE
find src -type f -name "*.ts" | sed '/.d.ts$/d' | sed '/jquery.ts$/d' | sed 's/^src\//export * from ".\//' | sed 's/.ts$/"/' >$FILE

pnpx typedoc
