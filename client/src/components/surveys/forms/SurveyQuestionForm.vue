<script setup lang="ts">
import { SurveyQuestion } from '@/types/survey/SurveyQuestion'

defineProps<{
  question: SurveyQuestion
}>()

const emit = defineEmits(['remove-question', 'add-option', 'remove-option'])
</script>

<template>
  <Card>
    <template #content>
      <div class="section">
        <label :for="'question-' + question.id">Domanda:</label>
        <div class="option-group">
          <InputText
            :id="'question-' + question.id"
            v-model="question.question"
            placeholder="Scrivi la tua domanda"
            style="width: 100%"
            required
          />
          <Button
            type="button"
            @click="emit('remove-question')"
            icon="pi pi-trash"
            severity="danger"
          />
        </div>

        <div style="display: flex; flex-direction: column; width: 100%; gap: 10px">
          <label>Opzioni:</label>
          <div
            v-for="(option, optionIndex) in question.options"
            :key="option.id"
            class="option-group"
          >
            <InputText
              v-model="option.text"
              style="width: 100%"
              placeholder="Inserisci l'opzione"
              required
            />
            <Button
              v-if="question.options.length > 2"
              type="button"
              @click="emit('remove-option', optionIndex)"
              icon="pi pi-trash"
              severity="danger"
            />
          </div>
        </div>

        <div style="width: 200px">
          <Button
            type="button"
            @click="emit('add-option')"
            label="Aggiungi opzione"
            icon="pi pi-plus"
            severity="primary"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.option-group {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>
