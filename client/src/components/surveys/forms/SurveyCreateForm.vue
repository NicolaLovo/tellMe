<script setup lang="ts">
import { ApiClient } from '@/api/ApiClient'
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { Survey } from '@/types/survey/Survey'
import { v4 as uuidv4 } from 'uuid'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/useUserStore'
import SurveyQuestionForm from './SurveyQuestionForm.vue'

import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()

const userStore = useUserStore()

const errorMessage = ref('')

/**
 * Survey object with a default initial question
 */
const survey = reactive<Survey>({
  _id: '',
  title: '',
  status: 'created',
  creationDate: new Date(),
  rewardPoints: 0,
  questions: [
    {
      id: uuidv4(),
      question: '',
      type: 'multiple-choice',
      options: [
        { id: uuidv4(), text: '' },
        { id: uuidv4(), text: '' },
      ],
    },
  ],
})

/**
 * Adds a new multiple-choice question to the survey
 */
const addMultipleChoiceQuestion = () => {
  survey.questions.push({
    id: uuidv4(),
    question: '',
    type: 'multiple-choice',
    options: [{ id: uuidv4(), text: '' }],
  })
}

/**
 * Removes a question from the survey
 */
const removeQuestion = (index: number) => {
  survey.questions.splice(index, 1)
}

/**
 * Adds a new option to a multiple-choice question
 */
const addOption = (questionIndex: number) => {
  survey.questions[questionIndex].options.push({ id: uuidv4(), text: '' })
}

/**
 * Removes an option from a question's options list
 */
const removeOption = (questionIndex: number, optionIndex: number) => {
  survey.questions[questionIndex].options.splice(optionIndex, 1)
}

const apiClient = new ApiClient({
  // We know that the user is logged in, so we can safely use the token
  jwtToken: userStore.user?.token as string,
})

/**
 * Handles the submission by calling the API to create the survey
 */
const handleSubmit = async () => {
  try {
    // check if title is empty
    if (!survey.title) {
      errorMessage.value = 'Il titolo del sondaggio non può essere vuoto.'
      return
    }

    //check if no questions are present
    if (survey.questions.length === 0) {
      errorMessage.value = 'Il sondaggio deve avere almeno una domanda.'
      return
    }

    for (const [index, question] of survey.questions.entries()) {
      if (question.options.length < 2) {
        errorMessage.value = `La domanda ${index + 1} deve avere almeno 2 opzioni.`
        return
      }
    }

    // check if reward points are valid
    if (survey.rewardPoints < 0) {
      errorMessage.value = 'I punti del sondaggio non possono essere negativi.'
      return
    }

    // check if some options are empty
    for (const question of survey.questions) {
      for (const option of question.options) {
        if (!option.text) {
          errorMessage.value = 'Tutte le opzioni devono essere compilate.'
          return
        }
      }
    }

    errorMessage.value = ''

    const response = await apiClient.townCouncil.surveys.create({ survey })

    if (response.status === 'success') {
      toast.success('Sondaggio creato correttamente')
      router.push(APP_ROUTES.townCouncil.home)
      return
    }
    toast.error('Errore nella creazione del sondaggio.')
    errorMessage.value = response.data.message
  } catch (err) {
    errorMessage.value = 'Errore nella creazione del sondaggio.'
    console.error(err)
  }
}
</script>

<template>
  <div class="survey-container">
    <div class="survey-form">
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="survey-title">Titolo:</label>
          <input
            type="text"
            id="survey-title"
            v-model="survey.title"
            placeholder="Inserisci il titolo del sondaggio"
            class="uniform-input"
            required
          />
        </div>
        <div class="input-group">
          <label for="reward-points">Punti sondaggio:</label>
          <input
            type="number"
            id="reward-points"
            v-model.number="survey.rewardPoints"
            placeholder="Inserisci il numero di punti"
            class="uniform-input"
            min="0"
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
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Padding per un po' di respiro ai bordi */
}

.survey-form {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 650px; /* Aumentato leggermente per più spazio */
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
  background-color: #4f0adf;
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
  background-color: #36039f;
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

input:focus {
  border-color: #815aff; /* blue border when focused */
  outline: none; /* removes default browser outline */
}
</style>
