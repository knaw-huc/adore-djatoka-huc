all: help
TAG = adore-djatoka
SHELL=/bin/bash
SRC_FILES=$(shell find src -type f)

.PHONY: dist
dist:
	ant

dist/adore-djatoka.war: $(SRC_FILES)
	ant

.PHONY: run-war
run-war: dist/adore-djatoka.war
	open http://localhost:8080/
	~/bin/run-war --path adore-djatoka dist/adore-djatoka.war

.PHONY: help
help:
	@echo "make-tools for $(TAG)"
	@echo
	@echo "Please use \`make <target>', where <target> is one of:"
	@echo "  dist    - to create the dist"
	@echo "  run-war - to run djatoka at http://localhost:8080/"
