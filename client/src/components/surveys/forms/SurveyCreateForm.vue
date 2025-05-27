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
  <form @submit.prevent="handleSubmit">
    <div class="survey-container">
      <div class="input-group">
        <label for="survey-title">Titolo:</label>
        <InputText
          id="survey-title"
          v-model="survey.title"
          placeholder="Inserisci il titolo del sondaggio"
          class="uniform-input"
          required
        />
      </div>
      <div class="input-group">
        <label for="reward-points">Punti sondaggio:</label>
        <InputNumber
          id="reward-points"
          v-model="survey.rewardPoints"
          placeholder="Inserisci il numero di punti"
          class="uniform-input"
          :min="0"
          required
          inputId="reward-points"
          :useGrouping="false"
          :showButtons="false"
          mode="decimal"
        />
      </div>

      <div
        v-for="(questionItem, questionIndex) in survey.questions"
        :key="questionItem.id"
        class="section"
        style="width: 100%"
      >
        <SurveyQuestionForm
          :question="questionItem"
          @remove-question="removeQuestion(questionIndex)"
          @add-option="addOption(questionIndex)"
          @remove-option="removeOption(questionIndex, $event)"
        />
      </div>

      <div class="center-div">
        <Button
          type="button"
          @click="addMultipleChoiceQuestion"
          label="Aggiungi Domanda"
          icon="pi pi-plus"
          style="width: 200px"
        />
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="center-div">
        <Button type="submit" label="Crea Sondaggio" icon="pi pi-check" style="width: 200px" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.survey-container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
}

.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.form-content {
  display: flex;
  flex-direction: column;

  gap: 4px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
