OUT=./generated-do-not-edit/

# Infers targets from all .tex files in the current directory
TARGETS=$(patsubst %.tex,$(OUT)%.svg,$(wildcard *.tex))

.PHONY : all
all: $(TARGETS)

${OUT}%.svg : %.pdf
	pdf2svg $< $@

%.pdf : %.tex
	latexmk -f $<
	latexmk -c $<

