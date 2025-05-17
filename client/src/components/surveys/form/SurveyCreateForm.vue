<script setup lang="ts">
import { Survey } from '@/types/survey/Survey'
import { v4 as uuidv4 } from 'uuid'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import SurveyQuestionForm from './SurveyQuestionForm.vue'
import { ApiClient } from '@/api/ApiClient' 
import { TownCouncilApiClient } from '@/api/TownCouncil/TownCouncilApiClient'

const router = useRouter()

const errorMessage = ref('')
const survey = reactive<Survey>({
  title: '',
  status: 'draft',
  questions: [
    {
      id: uuidv4(),
      question: '',
      type: 'multiple-choice',
      options: [{ id: uuidv4(), text: '' }],
    },
  ],
})

const addMultipleChoiceQuestion = () => {
  survey.questions.push({
    id: uuidv4(),
    question: '',
    type: 'multiple-choice',
    options: [{ id: uuidv4(), text: '' }],
  })
}

const removeQuestion = (index: number) => {
  survey.questions.splice(index, 1)
}

const addOption = (questionIndex: number) => {
  survey.questions[questionIndex].options.push({ id: uuidv4(), text: '' })
}

const removeOption = (questionIndex: number, optionIndex: number) => {
  survey.questions[questionIndex].options.splice(optionIndex, 1)
}

const apiClient = new TownCouncilApiClient({ jwtToken })

const handleSubmit = async (survey: Survey) => {
  try {
    const response = await apiClient.surveys.createSurvey(survey)

    if (response.status === 'success' && response.data?.surveyId) {
      console.log('Created survey with ID:', response.data.surveyId)
      // mostra messaggio di successo / reindirizza
    } else {
      console.error('Errore nella risposta:', response.data?.message)
      // mostra messaggio d'errore in UI
    }
  } catch (err) {
    console.error('Failed to create survey:', err)
    // mostra errore in UI
  }
}
</script>

<template>
  <div class="survey-container">
    <div class="survey-form">
      <h1>Crea il tuo Sondaggio</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="survey-title">Titolo Sondaggio:</label>
          <input
            type="text"
            id="survey-title"
            v-model="survey.title"
            placeholder="Inserisci il titolo del sondaggio"
            class="uniform-input"
            required
          />
        </div>

        <div
          v-for="(questionItem, questionIndex) in survey.questions"
          :key="questionItem.id"
          class="section"
        >
          <SurveyQuestionForm
            :question="questionItem"
            @remove-question="removeQuestion(questionIndex)"
            @add-option="addOption(questionIndex)"
            @remove-option="removeOption(questionIndex, $event)"
          />
        </div>

        <button type="button" @click="addMultipleChoiceQuestion" class="add-section-btn">
          Aggiungi Domanda
        </button>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <button type="submit" class="submit-btn">Crea Sondaggio</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
  margin-bottom: 15px;
  font-weight: bold;
}
.survey-container {
  background-color: #f5f3ff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 20px; /* Padding per un po' di respiro ai bordi */
}

.survey-form {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 650px; /* Aumentato leggermente per più spazio */
}

h1 {
  color: #5e4b8b;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  margin-top: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.uniform-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 15px; /* Aggiunta una spaziatura tra i campi */
  display: block;
  margin-left: auto;
  margin-right: auto;
}

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

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.add-section-btn,
.submit-btn {
  background-color: #28a745;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-section-btn:hover,
.submit-btn:hover {
  background-color: #218838;
}

.home-btn {
  background-color: #6c757d;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.home-btn:hover {
  background-color: #5a6268;
}

.option-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.remove-btn.small {
  padding: 8px 10px;
  font-size: 0.9rem;
}

.add-option-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.add-option-btn:hover {
  background-color: #0056b3;
}
</style>
