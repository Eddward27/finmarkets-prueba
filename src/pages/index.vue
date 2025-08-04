<template>
  <v-app>
    <SearchBarComponent />
    <v-divider></v-divider>
    <v-row no-gutters>
      <v-col cols="12" sm="9">
        <HeaderComponent />
      <ChartComponent />
      </v-col>
      <v-col cols="12" sm="3">
        <SummaryComponent />
      </v-col>
    </v-row>
    <TabComponent />
  </v-app>
</template>

<script setup>
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue';
import TabComponent from '@/components/TabComponent.vue';
//
</script>
