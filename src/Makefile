.PHONY: all
.SILENT: test compile compilePhp compileTypescript

all: test compile

test:
	echo "\n\n::: Run tests\n"
	(cd typescript && npm run test)

compile: compilePhp compileTypescript

compilePhp:
	echo "\n\n::: Compiling PHP\n"
	(cd php && php index.php | tidy -qi -w 0 > ../../app/index.html)

compileTypescript:
	echo "\n\n::: Compiling Typescript\n"
	(cd typescript \
	&& npx browserify linkjump.ts \
		-p [ tsify --noImplicitAny] \
		> ../../app/linkjump-bundle.js)

