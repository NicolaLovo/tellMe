
<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Benvenuto comune!</h1>
      <div class="button-div">
        <button class="button" @click="$router.push('/towncouncil/createsurvey')">
          Crea sondaggio
        </button>
        <button class="button" @click="$router.push('/towncouncil/surveys')">
          Visualizza sondaggi
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.content {
  text-align: center;
  background-color: #f5f3ff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #5e4b8b;
  margin-bottom: 20px;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.button {
  background-color: #9578f4;
  color: white;
  font-size: 1.2rem;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 100%;
}

.create-button:hover {
  background-color: #815aff;
  transform: scale(1.05);
}

.create-button:focus {
  outline: none;
}
</style>
