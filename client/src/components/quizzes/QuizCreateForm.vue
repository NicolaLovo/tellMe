<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
import { useUserStore } from '@/stores/useUserStore'
import { v4 as uuidv4 } from 'uuid'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

const errorMessage = ref('')

const quiz = reactive({
  _id: '',
  title: '',
  creationDate: new Date(),
  status: 'created',
  questions: [
    {
      id: uuidv4(),
      question: '',
      type: 'rating',
    },
  ],
})

const addRatingQuestion = () => {
  quiz.questions.push({
    id: uuidv4(),
    question: '',
    type: 'rating',
  })
}

const removeQuestion = (index: number) => {
  quiz.questions.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    if (!quiz.title) {
      errorMessage.value = 'Il titolo del quiz non può essere vuoto.'
      return
    }

    if (quiz.questions.length === 0) {
      errorMessage.value = 'Il quiz deve avere almeno una domanda.'
      return
    }

    for (const [index, question] of quiz.questions.entries()) {
      if (!question.question) {
        errorMessage.value = `La domanda ${index + 1} non può essere vuota.`
        return
      }
    }

    errorMessage.value = ''

    // TODO: inserire chiamata API
    toast.success('Quiz creato correttamente')
    router.push(APP_ROUTES.townCouncil.home)
  } catch (err) {
    errorMessage.value = 'Errore nella creazione del quiz.'
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="quiz-container">
      <div class="input-group">
        <label for="quiz-title">Titolo:</label>
        <InputText
          id="quiz-title"
          v-model="quiz.title"
          placeholder="Inserisci il titolo del quiz"
          class="uniform-input"
          required
        />
      </div>

      <div
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        class="section"
        style="width: 100%"
      >
        <div class="input-group">
          <label :for="`question-${index}`">Domanda {{ index + 1 }}:</label>
          <InputText
            :id="`question-${index}`"
            v-model="question.question"
            placeholder="Inserisci la domanda"
            class="uniform-input"
            required
          />
        </div>

        <div class="center-div spaced-button">
          <Button
            type="button"
            @click="removeQuestion(index)"
            icon="pi pi-trash"
            label="Rimuovi Domanda"
            severity="danger"
            outlined
            style="width: 200px"
          />
        </div>
      </div>

      <div class="center-div">
        <Button
          type="button"
          @click="addRatingQuestion"
          label="Aggiungi Domanda"
          icon="pi pi-plus"
          style="width: 200px"
        />
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="center-div">
        <Button type="submit" label="Crea Quiz" icon="pi pi-check" style="width: 200px" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.quiz-container {
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

.spaced-button {
  margin-top: 12px; /* distanza tra input e bottone */
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
