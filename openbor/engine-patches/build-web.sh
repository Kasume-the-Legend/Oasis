#!/bin/bash
# Builds OpenBOR (DCurrent/openbor @65a7f0b) to WebAssembly. Requires emcc (3.1.54 + LLVM 18 + binaryen 115 in this env).
set -e
source "$(dirname "$0")/env.sh"
INC="-Iengine -Iengine/source -Iengine/source/gamelib -Iengine/source/gfxlib -Iengine/source/openborscript -Iengine/source/pnglib -Iengine/source/preprocessorlib -Iengine/source/ramlib -Iengine/source/randlib -Iengine/source/scriptlib -Iengine/source/tracelib2 -Iengine/source/webmlib -Iengine/source/adpcmlib -Iengine/sdl"
FL="-O2 -std=gnu99 -fsigned-char -DSDL=1 -DLINUX -DOV_EXCLUDE_STATIC_CALLBACKS -sUSE_SDL=2 -sUSE_ZLIB=1 -sUSE_VORBIS=1 -sUSE_OGG=1 -sUSE_LIBPNG=1 -w"
mkdir -p obj out
{ cat srcs.txt; echo engine/web/web_shim.c; } | xargs -P 8 -I{} sh -c 'emcc -c {} -o obj/$(echo {} | tr / _).o '"$INC $FL"
emcc obj/*.o -o out/openbor.js -O2 -sUSE_SDL=2 -sUSE_ZLIB=1 -sUSE_VORBIS=1 -sUSE_OGG=1 -sUSE_LIBPNG=1 -sASYNCIFY=1 -sALLOW_MEMORY_GROWTH=1 -sINITIAL_MEMORY=268435456 -sMAXIMUM_MEMORY=2147483648 -sFORCE_FILESYSTEM=1 -lidbfs.js -sEXPORTED_RUNTIME_METHODS=FS,callMain -sEXIT_RUNTIME=0 -sINVOKE_RUN=0 -sSTACK_SIZE=1048576
