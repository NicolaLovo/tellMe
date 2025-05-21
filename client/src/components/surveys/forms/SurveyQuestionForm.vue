<script setup lang="ts">
import { SurveyQuestion } from '@/types/survey/SurveyQuestion'

defineProps<{
  question: SurveyQuestion
}>()

const emit = defineEmits(['remove-question', 'add-option', 'remove-option'])
</script>
<template>
  <div class="section">
    <label :for="'question-' + question.id">Domanda:</label>
    <div class="section-header">
      <input
        type="text"
        :id="'question-' + question.id"
        v-model="question.question"
        class="uniform-input"
        placeholder="Scrivi la tua domanda"
        required
      />
      <button type="button" @click="emit('remove-question')" class="btn danger small">
        <i class="pi pi-trash"></i>
      </button>
    </div>

    <div>
      <label>Opzioni:</label>
      <div v-for="(option, optionIndex) in question.options" :key="option.id" class="option-group">
        <input
          type="text"
          v-model="option.text"
          class="uniform-input"
          placeholder="Inserisci l'opzione"
          required
        />
        <button
          v-if="question.options.length > 2"
          type="button"
          @click="emit('remove-option', optionIndex)"
          class="btn danger small"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
      <button type="button" @click="emit('add-option')" class="btn primary small">
        Aggiungi opzione
      </button>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9ff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.section-header-actions {
  display: flex;
  margin-left: auto;
}

.option-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.option-group .uniform-input {
  margin-bottom: 0;
}

.uniform-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.btn {
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn.primary {
  background-color: #9578f4;
  color: white;
}

.btn.primary:hover {
  background-color: #815aff;
}

.btn.danger {
  background-color: #f44336;
  color: white;
}

.btn.danger:hover {
  background-color: #d32f2f;
}

.btn.small {
  padding: 10px 10px;
  font-size: 0.8rem;
  display: block;
  margin: 0 auto;
}

input:focus {
  border-color: #815aff;
  outline: none;
}
</style>
