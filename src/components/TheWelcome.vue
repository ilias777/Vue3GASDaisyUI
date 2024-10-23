<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { ref, onMounted } from 'vue'

const spreadsheetData = ref([])

const getDataFromSheet = () => {
  google.script.run
    .withSuccessHandler(response => {
      spreadsheetData.value = response
    })
    .getSheetData()
}

onMounted(() => {
  getDataFromSheet()
})

const dataToSheet = ['four', 'five', 'six']

const writeDataToSheet = () => {
  google.script.run.withSuccessHandler().writeValues(dataToSheet)
}
</script>

<template>
  <div class="homeview">
    <div>
      <h1 class="text-3xl font-bold underline mb-5">
        Text with tailwind classes
      </h1>
      <button class="btn mb-5" @click="writeDataToSheet">DaisyUI Button</button>
      <p>These are the data from SpreadsheetApp: {{ spreadsheetData }}</p>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .homeview {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
