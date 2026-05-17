<template>
  <div>
    <!-- Sommaire construit depuis les H1 du DOM (seulement si 2+ sections) -->
    <div v-if="toc.length > 1" class="toc-container">
      <div class="toc-header">
        <span class="toc-icon">☰</span>
        <span class="toc-title">Sommaire</span>
      </div>
      <nav class="toc-nav">
        <a v-for="item in toc" :key="item.id" class="toc-link" @click.prevent="scrollToHeading(item.id)">
          <span class="toc-bullet"></span>
          {{ item.text }}
        </a>
      </nav>
    </div>

    <!-- Contenu HTML rendu par le serveur via marked -->
    <div ref="contentRef" class="markdown-content" v-html="html"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue"

const props = defineProps({
  html: {
    type: String,
    default: "",
  },
})

const contentRef = ref(null)
const toc = ref([])

async function buildToc() {
  await nextTick()
  if (!contentRef.value) return

  // On ne cible que les H1
  const headings = contentRef.value.querySelectorAll("h1")
  const slugCount = {}
  const items = []

  headings.forEach((el) => {
    const text = el.textContent.trim()

    let id = el.id
    if (!id) {
      id = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")

      if (slugCount[id] !== undefined) {
        slugCount[id]++
        id = `${id}-${slugCount[id]}`
      } else {
        slugCount[id] = 0
      }

      el.id = id
    }

    items.push({ text, id })
  })

  toc.value = items
}

function scrollToHeading(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

watch(() => props.html, buildToc, { immediate: true })
</script>

<style scoped>
/* ── Sommaire ─────────────────────────────────── */
.toc-container {
  background: var(--ion-color-light, #f4f4f4);
  border-left: 3px solid var(--ion-color-primary, #3880ff);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 1rem 0 1.5rem;
}

.toc-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ion-color-primary, #3880ff);
  margin-bottom: 0.6rem;
}

.toc-icon {
  font-size: 0.9rem;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ion-color-dark, #222);
  text-decoration: none;
  font-size: 0.88rem;
  line-height: 1.5;
  padding: 0.1rem 0;
  cursor: pointer;
  transition: color 0.15s;
}

.toc-link:hover,
.toc-link:active {
  color: var(--ion-color-primary, #3880ff);
}

.toc-bullet {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
}

/* ── Contenu markdown ─────────────────────────── */
.markdown-content {
  line-height: 1.8;
  color: var(--ion-color-dark, #222);
  max-width: 680px;
  margin: 0 auto;
}

.toc-container {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

/* H1 : modeste, juste un cran au-dessus du texte */
:deep(h1) {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ion-color-dark, #222);
  border-left: 3px solid var(--ion-color-primary, #3880ff);
  padding-left: 0.6rem;
  margin: 1.6rem 0 0.5rem;
  line-height: 1.4;
}

:deep(p) {
  margin: 0.5rem 0;
}

:deep(ul),
:deep(ol) {
  padding-left: 1.4rem;
  margin: 0.5rem 0;
}

:deep(li) {
  margin-bottom: 0.3rem;
  line-height: 1.7;
}

:deep(strong) {
  font-weight: 700;
}

:deep(em) {
  font-style: italic;
}

:deep(code) {
  font-family: monospace;
  background: var(--ion-color-light, #f4f4f4);
  padding: 0.1em 0.3em;
  border-radius: 3px;
  font-size: 0.9em;
}

:deep(blockquote) {
  border-left: 3px solid var(--ion-color-medium, #888);
  margin: 1rem 0;
  padding: 0.4rem 1rem;
  color: var(--ion-color-medium, #888);
  font-style: italic;
}

:deep(hr) {
  border: none;
  border-top: 1px solid var(--ion-color-light-shade, #ddd);
  margin: 1.5rem 0;
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

:deep(th),
:deep(td) {
  border: 1px solid var(--ion-color-light-shade, #ddd);
  padding: 0.4rem 0.7rem;
  text-align: left;
}

:deep(th) {
  background: var(--ion-color-light, #f4f4f4);
  font-weight: 600;
}
</style>
