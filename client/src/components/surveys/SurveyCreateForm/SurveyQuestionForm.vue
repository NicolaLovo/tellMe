<script setup lang="ts">
import { SurveyQuestion } from '@/types/survey/SurveyQuestion'

defineProps<{
  question: SurveyQuestion
}>()

const emit = defineEmits(['remove-question', 'add-option', 'remove-option'])

const addLocalOption = () => {
  emit('add-option')
}

const removeLocalOption = (index: number) => {
  emit('remove-option', index)
}
</script>

<template>
  <div class="section">
    <div class="section-header">
      <label :for="'question-' + question.id">Domanda:</label>
      <button type="button" @click="$emit('remove-question')" class="btn danger small">
        <i class="pi pi-trash"></i>
      </button>
    </div>

    <input
      type="text"
      :id="'question-' + question.id"
      v-model="question.question"
      class="uniform-input"
      placeholder="Scrivi la tua domanda"
      required
    />

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
        <button type="button" @click="removeLocalOption(optionIndex)" class="btn danger small">
          <i class="pi pi-trash"></i>
        </button>
      </div>
      <button type="button" @click="addLocalOption" class="btn primary small">
        Aggiungi Opzione
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.option-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.uniform-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

/* PULSANTI UNIFORMI E PIÙ PICCOLI */
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

/* Colori */
.btn.primary {
  background-color: #007bff;
  color: white;
}

.btn.primary:hover {
  background-color: #0056b3;
}

.btn.danger {
  background-color: #f44336;
  color: white;
}

.btn.danger:hover {
  background-color: #d32f2f;
}

/* Dimensioni ridotte */
.btn.small {
  padding: 6px 10px;
  font-size: 0.8rem;
}
</style>
