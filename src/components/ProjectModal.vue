<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const modal = ref(null);
const closeButton = ref(null);
let previousActiveElement;
let previousOverflow = "";

function close() {
  emit("close");
}

function onKeydown(event) {
  if (event.key === "Escape") {
    close();
    return;
  }

  if (event.key !== "Tab" || !modal.value) return;

  const focusable = [...modal.value.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

onMounted(async () => {
  previousActiveElement = document.activeElement;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", onKeydown);
  await nextTick();
  closeButton.value?.focus();
});

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow;
  window.removeEventListener("keydown", onKeydown);
  previousActiveElement?.focus?.();
});
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @mousedown.self="close">
      <article
        ref="modal"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-title-${props.project.id}`"
        :aria-describedby="`modal-summary-${props.project.id}`"
      >
        <button ref="closeButton" class="modal-close" aria-label="关闭项目详情" @click="close">×</button>
        <div class="modal-top" :class="`modal-${props.project.color}`">
          <span>{{ props.project.kicker }}</span><strong>{{ props.project.number }}</strong>
        </div>

        <figure class="modal-media">
          <img :src="props.project.cover" :alt="props.project.coverAlt" width="1536" height="1024" />
          <figcaption>{{ props.project.visualLabel }} · CONCEPT VISUAL</figcaption>
        </figure>

        <div class="modal-content">
          <p class="eyebrow">PROJECT CASE STUDY · {{ props.project.year }}</p>
          <h2 :id="`modal-title-${props.project.id}`">{{ props.project.title }}</h2>
          <p :id="`modal-summary-${props.project.id}`" class="modal-lead">{{ props.project.summary }}</p>
          <div class="modal-meta">
            <div><span>职责</span><p>{{ props.project.role }}</p></div>
            <div><span>技术栈</span><p>{{ props.project.stack.join(" · ") }}</p></div>
          </div>
          <div class="case-grid">
            <section><span>01 / 挑战</span><h3>问题是什么？</h3><p>{{ props.project.challenge }}</p></section>
            <section><span>02 / 方案</span><h3>如何解决？</h3><p>{{ props.project.solution }}</p></section>
          </div>
          <section class="deliverables">
            <span>03 / 核心实现</span>
            <ul><li v-for="item in props.project.highlights" :key="item">{{ item }}</li></ul>
          </section>
        </div>
      </article>
    </div>
  </Teleport>
</template>
