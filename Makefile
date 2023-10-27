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

.PHONY: run-ubuntu-bash
run-ubuntu-bash:
	docker run -it -v .:/data ubuntu:latest bash

.PHONY: help
help:
	@echo "make-tools for $(TAG)"
	@echo
	@echo "Please use \`make <target>', where <target> is one of:"
	@echo "  dist            - to create the dist"
	@echo "  run-war         - to run djatoka at http://localhost:8080/"
	@echo "  run-ubuntu-bash - to run bash in a ubuntu docker image with the right jdk to make the war for java 1.6"
