/* Browser/WebAssembly shims for the OpenBOR web port. */
#include <string.h>
#include <sys/sysinfo.h>
#include <emscripten.h>

/* The engine sizes caches from system RAM. Report a fixed, modest budget
 * (the wasm heap is capped, so real host RAM is irrelevant). */
int sysinfo(struct sysinfo *info)
{
    memset(info, 0, sizeof(*info));
    info->totalram = 1024UL * 1024UL * 1024UL;
    info->freeram  = 768UL * 1024UL * 1024UL;
    info->mem_unit = 1;
    return 0;
}
